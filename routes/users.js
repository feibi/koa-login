var router = require('koa-router')();
const zlib = require('zlib');
const chalk = require('chalk');

import {User} from '../modules';
const data = {
    code: 0,
    message: 'success',
    result: {
        list: []
    }
}

router.get('/', async function(ctx, next) {
    ctx.state = {
        title: 'user titles'
    };

    let userList = await User.find();
    data.result.list = userList;

    //await ctx.render('user', data);
    ctx.body = await data
    data.message = ctx.response.message;
    data.result.total = userList.length
    console.log(chalk.cyan('ctx.response.message'), '\n', userList.length)

});
router.get('/add', async function(ctx, next) {
    const data = {
        name: 'whiles',
        number: 3
    };
    let userList = new User(data);
    userList.save()

    //await ctx.render('user', data);
    ctx.body = await data
    data.message = ctx.response.message;
    console.log(chalk.cyan('ctx.response.message'), '\n', ctx.response)

});

module.exports = router;
