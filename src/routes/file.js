import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';

module.exports = (router) => {
  router.get('/file/:id', async function(ctx, next) {
    const srcArr = [
      'http://oleorf7zw.bkt.clouddn.com/images/2017/2/15/avatar.jpg',
      //'http://192.168.30.216:10200/fetchFile?id=596c38196237dc9c0803089b'
    ];

    if (!fs.existsSync('files')) {
      fs.mkdirSync('files');
    }

    const output = fs.createWriteStream(path.join('files', 'test') + '.zip');
    const archive = archiver('zip')
    archive.pipe(output);

    await Promise.all(srcArr.map(async function(src, index) {
      const filename = src.substring(src.lastIndexOf('/') + 1);
      const file = await fetch(src);
      console.log(file)
      archive.append(file.body, {
        name: index + '.jpg'
      })

    }))
    const zipData = archive.finalize()

    ctx.body = {
      code: 200,
      status: 'OK',
      response: {
        message: 'success'
      }
    }
  })

};