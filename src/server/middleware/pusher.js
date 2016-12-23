import fs from 'fs'
import mime from 'mime'
import destroy from 'destroy'

export default function pusher () {
    return function (ctx, next) {
        function push (file) {
            const opts = {
                request: {
                    accept: '*/*'
                },
                response: {
                    'content-type': mime.lookup(file)
                }
            };

            const p = ctx.res.push(file, opts, (_, stream) => {
                // cleanup function borrowed from spdy-push
                function cleanup (err) {
                    if (err) {
                        console.error(err.stack);
                    }

                    stream.removeListener('error', cleanup);
                    stream.removeListener('close', cleanup);
                    stream.removeListener('finish', cleanup);

                    destroy(content);
                }

                stream.on('error', cleanup);
                stream.on('close', cleanup);
                stream.on('finish', cleanup);
            });

            const content = fs.createReadStream(process.cwd() + '/dist' + file);
            content.pipe(p);
        }

        if (ctx.req.url === '/') {
            console.log(ctx.state.h2)
            Object.keys(ctx.state.h2).map(push);
        }

        return next();
    }
}
