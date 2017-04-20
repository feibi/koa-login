import koaRouter from 'koa-router';


//import users from './users';
import login from './login';
import API from '../api';

module.exports = (app)=>{
  const router = koaRouter();

  app.use(router.routes()).use(router.allowedMethods());

  router.get('/', async function(ctx, next) {
      ctx.state = {
          title: 'koa2 titles'
      };
      let { user } = ctx.session;
      console.log(ctx.session)
      await ctx.render('index', {user});

  })
  API(router)
  login(router)
  router.get('*', async (ctx, next) => {
        ctx.status = 404;
        return ctx.render('error', {});
    });
};
