module.exports = (router) => {
    router.get('/login', async function(ctx, next) {
        ctx.state = {
            title: 'koa2 titles'
        };
        let {user} = ctx.session;
        if (user) {
            return ctx.redirect('/');
        }

        await ctx.render('login', {});

    })
    router.get('/logout', async(ctx, next) => {
        ctx.session.user = null;
        return ctx.redirect('/');
    });
    router.get('/signup', async function(ctx, next) {
        ctx.state = {
            title: 'koa2 titles'
        };
        let user = ctx.session.user;
        if (user) {
            return ctx.redirect('/');
        }
        await ctx.render('signup', {});

    })
};
