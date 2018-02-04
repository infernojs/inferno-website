'use strict';

const config = require('../config');
const path = require('path');
const url = require('url');
const fs = require('mz/fs');
const mime = require('mime');
const zlib = require('zlib');
const logger = require('debug');

function serverpushConstructor(opts) {

  opts = opts ? opts : {};
  opts.manifest = opts.manifest || 'push_manifest.json';
  opts.gaeproxy = opts.gaeproxy ? true : false;
  opts.port = opts.port ? opts.port : false;
  opts.singleheader = opts.singleheader ? true : false;

  return function serverpush(ctx, next) {

    return next().then(function() {

      if (!ctx.response.is('html')) {
        console.log(ctx.url, ' is not HTML. Skipping...');
        return;
      } else {
        console.log(ctx.url, ' is HTML');
      }

      if ('nopush' in ctx.query) return;

      return new Promise((res, req) => {

        const manifestfile = path.resolve(opts.manifest);

        fs.stat(manifestfile)
          .then(stat => stat.isFile())
          .then(() => fs.readFile(manifestfile))
          .then(file => {
            let links = [];
            let contents = [];
            let data = JSON.parse(file.toString());

            for (let key in data) {
              let u = url.resolve(`${ctx.protocol}://${ctx.host}`, key);
              if (process.env.DEV) {
                u = url.resolve(`${ctx.protocol}://${ctx.host}:${config.http.port + 2}`, key);
              }
              contents.push(u);
              links.push(`<${u}>; rel=preload; as=${data[key].type}`);
            }

            if (opts.gaeproxy && contents.length > 10) {
              console.warn('Google App Engine only supports a maximum of 10 resources to be sent via server push at this time.');
            }

            if (contents.length > 0) {

              if (opts.gaeproxy) {
                ctx.set('X-Associated-Content', contents.join(', '));
              }

              if (opts.singleheader) {
                ctx.set('Link', links.join(', '));
              } else {
                ctx.set('Link', links);
              }
            } else {
              return;
            }
            ctx.state.h2push = {
              links: links,
              contents: contents,
              data: data
            };
          })
          .then(() => {
            logger('inferno:push')(' LINK SET ');

            ctx.state.h2push.contents.forEach(location => {
              const pathname = url.parse(location).pathname;
              console.log('--', path.join(__dirname, '../../..', pathname));
              const content = fs.createReadStream(path.join(__dirname, '../../..', pathname));
              const p = ctx.res;

              content.pipe(zlib.createGzip()).pipe(p);
              //res();

              ctx.res.on('error', err => {
                console.error(err);
              });
            });
          })
          .catch(err => {
            logger('inferno:push')(err);
            res();
          });
      });

    });

  };
}

export default serverpushConstructor;
