import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';
import sendfile from 'koa-sendfile';

module.exports = (router) => {
  router.get('/file/:id', async function (ctx, next) {
    const srcArr = [
      'http://oleorf7zw.bkt.clouddn.com/images/2017/2/15/avatar.jpg',
      'http://i.meizitu.net/2013/07/72293400gw1e2ai1vv1frj.jpg'
    //'http://192.168.30.216:10200/fetchFile?id=596c38196237dc9c0803089b'
    ];
    const filePath = path.join('files', 'test.zip');
    await fetchFileToZip(srcArr);
    ctx.attachment('test.zip')
    await sendfile(ctx, filePath)
  })

};

async function fetchFileToZip(srcArr) {
  if (!fs.existsSync('files')) {
    fs.mkdirSync('files');
  }
  const filePath = path.join('files', 'test.zip');
  const output = fs.createWriteStream(filePath);
  const archive = archiver('zip')

  archive.pipe(output);

  await Promise.all(srcArr.map(async function (src, index) {
    const filename = src.substring(src.lastIndexOf('/'));
    const file = await fetch(src);
    archive.append(file.body, {
      name: filename
    })
  }))
  await archive.finalize();
}