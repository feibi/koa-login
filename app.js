const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const isJSON = require('koa-is-json');
const compress = require('koa-compress')
const session = require('koa-session');
const zlib = require('zlib');

import routes from './routes';

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.keys = ['zylee'];
app.use(convert(session({
   key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
   maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
},app)));
app.use(compress({
    filter: function(content_type) { //配置过滤的压缩文件的类型
        return /text|json/i.test(content_type)
    },
    threshold: 2048, //要压缩的最小响应字节
    flush: require('zlib').Z_SYNC_FLUSH //同步的刷新缓冲区数据；
}))
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));
app.use(views(__dirname + '/views', {extension: 'jade'}));

// routes
routes(app);

// response

app.on('error', function(err, ctx) {
    console.log(err)
    logger.error('server error', err, ctx);
});

module.exports = app;
