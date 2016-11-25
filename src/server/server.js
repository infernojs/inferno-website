import logger from 'debug'
import Koa from 'koa'
import bodyParser from 'koa-better-body'
import favicon from 'koa-favicon'
import serve from 'koa-static2'
import config from './config'
import context from './middleware/context'
import catcher from './middleware/catcher'
import render from './middleware/render'

const app = new Koa()

// Middleware
app.use(favicon(config.http.favicon))
app.use(bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
    bufferLimit: '4mb'
}))
app.use(context)
app.use(catcher)
app.use(render)

// Serve static files
config.http.static.forEach(staticRoute => {
    logger('inferno:static')(staticRoute.path)
    app.use(serve(staticRoute.url, staticRoute.path))
})

app.listen(config.http.port, function() {
    logger('inferno:start')('Listening on port ' + config.http.port)
})
