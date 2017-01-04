import logger from 'debug'
import Koa from 'koa'
import fs from 'fs'
import path from 'path'
import bodyParser from 'koa-better-body'
import compress from 'koa-compress'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import serve from 'koa-static'
import convert from 'koa-convert'
import http2 from 'http2'

import config from './config'
// import serverpush from './middleware/serverpush'
import catcher from './middleware/catcher'
import render from './middleware/render'
import markdown from './routes/markdown'
import hooks from './routes/hooks'

const app = new Koa()

// Middleware
/*app.use(serverpush({
    manifest: path.join(__dirname, '../../push_manifest.json'),
    singleheader: false
}))*/
app.use(favicon(config.http.favicon))
app.use(compress())
app.use(convert(bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
    bufferLimit: '4mb'
})))

app.use(catcher)
app.use(markdown.routes())
app.use(hooks.routes())

// Serve static files
config.static.forEach(staticRoute => {
    logger('inferno:static')(staticRoute.path)
    app.use(mount(staticRoute.url, convert(serve(staticRoute.path))))
})

// Serve service worker
// app.use(serve(require('path').join(__dirname, '../assets/service')))
app.use(serve(require('path').join(__dirname, '../../public/assets/service')))

// Render inferno app
app.use(render)

//if (process.env.DEV) {
    // Without HTTP2 support
    app.listen(config.http.port, function() {
        logger('inferno:start')('Listening on port ' + config.http.port)
    })
// } else {
//     // With HTTP2 support
//     const server = http2.createServer({
//         key: fs.readFileSync(config.server.certificate_key),
//         cert: fs.readFileSync(config.server.certificate)
//     }, app.callback())
//
//     server.listen(config.http.port, (error) => {
//         if (error) {
//             logger('inferno:error')(error)
//             process.exit(1)
//         } else {
//             logger('inferno:start')('Running with HTTP/2 enabled')
//             logger('inferno:start')('Listening on port ' + config.http.port)
//         }
//     })
// }
