const Koa = require('koa');

const app = new Koa();
const router = require('./middleware/routes');

app
    .use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = {
                message: err.message
            };
        }
    })
    .use(router.allowedMethods())
    .use(router.routes())
    .use(require('koa-body')())
    .listen(48703);