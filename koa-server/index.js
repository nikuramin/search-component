const Koa = require('koa');

const app = new Koa();
const router = require('./middleware/routes');

app
    .use(async (ctx, next) => {
        try {
            ctx.set('Access-Control-Allow-Origin', '*');
            await next();
        } catch (err) {
            ctx.status = err.statusCode || Number(err.status) || 500;
            ctx.body = {
                message: err.message
            };
        }
    })
    .use(require('koa-body')())
    .use(router.allowedMethods())
    .use(router.routes())
    .listen(48703);