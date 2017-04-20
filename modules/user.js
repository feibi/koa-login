const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let usersSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})
usersSchema.statics.add = async function(ctx, user) {

    let document = await this.findOne({username: user.username});

    if (document) {
        return {status: 'error', msg: '此邮箱已注册'};
    }
    await user.save();
    user.password = null;
     ctx.session.user = user;
    return {status: 'success', msg: '注册成功', user};
}

usersSchema.statics.login = async function(ctx, username, password) {

    let user = await this.findOne({username});
    console.log(user)
    if (user) {
        if (password === user.password) {
            user.password = null;
            ctx.session.user = user;
            return {status: 'success', msg: '登录成功', user}
        }
        return {status: 'error', msg: '密码错误', user};
    }
    return {status: 'error', msg: '邮箱未注册', user};
}

let User = mongoose.model('user', usersSchema);

module.exports = User
