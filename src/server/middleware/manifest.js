import url from 'url';
import path from 'path';

export default function manifestMw(manifestFile) {
  const manifest = require(path.resolve('.', manifestFile));

  return async(ctx, next) => {
    // If we receive a request for a file _inside_ the manifest, move on to the next middleware.
    if (manifest[ctx.req.url]) {
      return next();
    }

    const links = [];

    Object.keys(manifest).forEach(key => {
      const u = url.resolve(`${ctx.protocol}://${ctx.host}`, key);
      const link = `<${u}>; rel=preload; as=${manifest[key].type}`;
      links.push(link);
    });

    ctx.set('Link', links.join(', '));
    // Link: <https://localhost:3000/static/main-9a42a4188a.css>; rel=preload; as=style, <https://localhost:3000/app/common_2-3574809b05.js>; rel=preload; as=script, <https://localhost:3000/static/js/primus.js>; rel=preload; as=script, <https://localhost:3000/bower_components/polymer/polymer.html>; rel=preload; as=document
    ctx.state.h2 = manifest;

    return await next();
  };
}
