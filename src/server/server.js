import logger from 'debug'
import Koa from 'koa'
import path from 'path'
import bodyParser from 'koa-better-body'
import compress from 'koa-compress'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import serve from 'koa-static'
import convert from 'koa-convert'

import config from './config'
import serverpush from './middleware/serverpush'
import catcher from './middleware/catcher'
import render from './middleware/render'
import markdown from './routes/markdown'
import hooks from './routes/hooks'

const app = new Koa()

// Middleware
app.use(serverpush({
    manifestName: path.join(__dirname, '../../push_manifest.json')
}))
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

// Render inferno app
app.use(render)

app.listen(config.http.port, function() {
    logger('inferno:start')('Listening on port ' + config.http.port)
})
