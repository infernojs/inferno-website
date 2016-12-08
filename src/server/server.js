import logger from 'debug'
import Koa from 'koa'
import bodyParser from 'koa-better-body'
import compress from 'koa-compress'
import favicon from 'koa-favicon'
import mount from 'koa-mount'
import serve from 'koa-static'
import config from './config'
import catcher from './middleware/catcher'
import render from './middleware/render'
import markdown from './routes/markdown'
import hooks from './routes/hooks'

const app = new Koa()

// Middleware
app.use(favicon(config.http.favicon))
app.use(compress())
app.use(bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
    bufferLimit: '4mb'
}))

// Serve static files
config.http.static.forEach(staticRoute => {
    logger('inferno:static')(staticRoute.path)
    app.use(mount(staticRoute.url, serve(staticRoute.path)))
})

app.use(catcher)
app.use(markdown.routes())
app.use(hooks.routes())
app.use(render)

app.listen(config.http.port, function() {
    logger('inferno:start')('Listening on port ' + config.http.port)
})
