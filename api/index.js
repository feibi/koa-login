import {User} from '../modules';

export default(router) => {
    router.post('/api/login', async(ctx, next) => {
        let {username, password} = ctx.request.body;
        console.log(ctx.request.body)

        let res = await User.login(ctx, username, password);


        if (res.status === 'success') {
            return ctx.redirect('/');
        }

        if (res.status === 'error') {
            return ctx.redirect('/login');
        }
    })
    router.post('/api/signup', async(ctx, next) => {
        let {username, password} = ctx.request.body;

        let user = new User({username, password})
        let res = await User.add(ctx, user);
              console.log('res:', res)
        if (res.status === 'success') {
            return ctx.redirect('/');
        }

        if (res.status === 'error') {
            return ctx.redirect('/signup');
        }
    })
}
