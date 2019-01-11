const Router = require('koa-router');
const router = new Router();
const user = require('../models/user');

router
    .get('/user', async ctx => {
        let offset = ctx.request.query.offset ? Number(ctx.request.query.offset) : 0;
        ctx.body = await user.getAll(offset);
    })
    .get('/user/:id', async ctx => {
        ctx.body = await user.get(ctx.params.id);;
    })
    .get('/searchUser', async ctx => {
        let offset = ctx.request.query.offset ? Number(ctx.request.query.offset) : 0;
        if (ctx.request.query.q)
            ctx.body = await user.searchByName(ctx.request.query.q, offset);
        else
            ctx.body = {error:'empty search string'}
    });

module.exports = router;