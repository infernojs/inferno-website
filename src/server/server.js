import logger from 'debug'
import Koa from 'koa'
import fs from 'fs'
import bodyParser from 'koa-better-body'
import compress from 'koa-compress'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import serve from 'koa-static'
import convert from 'koa-convert'
import spdy from 'spdy'

import config from './config'
import catcher from './middleware/catcher'
import render from './middleware/render'
import markdown from './routes/markdown'
import hooks from './routes/hooks'

const app = new Koa()

// Middleware
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
app.use(serve(require('path').join(__dirname, '../assets/service')))

app.use(render)

const options = {
    spdy: {
        procotols: ['h2'],
        plain: true,
        ssl: false
    }
}

try {
    if (fs.openSync(config.server.certificate, fs.constants.R_OK)) {
        options.cert = fs.readFileSync(config.server.certificate)
        options.key = fs.readFileSync(config.server.certificate_key)
    }
    logger('inferno:start')('Running with HTTP/2 enabled')
} catch(e) {
    logger('inferno:start')('Running with HTTP/2 disabled')
}


const server = spdy.createServer(options, app.callback())

server.listen(config.http.port, function() {
    logger('inferno:start')('Listening on port ' + config.http.port)
})
