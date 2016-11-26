import Inferno from 'inferno'
import { renderToStaticMarkup } from 'inferno-server'
import { match } from 'inferno-router'
import onEnter from '../../../core/helpers/onEnter';
import routes from '../../client/routes'
import Html from '../../client/containers/Html'

// Server-side render
export default async(ctx, next) => {
    const renderProps = match(routes, ctx.url)
    const content = <Html hostname={ctx.hostname}/>

    // Run onEnter methods of matched component
    await onEnter(renderProps)

    ctx.body = '<!DOCTYPE html>\n' + renderToStaticMarkup(content)
    await next()
}
