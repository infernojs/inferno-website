import Inferno from 'inferno'
import { renderToStaticMarkup } from 'inferno-server'
import { match } from 'inferno-router'
import routes from '../../client/routes'
import Html from '../../client/containers/Html'

// Server-side render
export default async(ctx, next) => {
    const renderProps = match(routes, ctx.url)
    ctx.body = '<!DOCTYPE html>\n' + renderToStaticMarkup(<Html stores={ctx.stores} hostname={ctx.hostname}/>)
    await next()
}
