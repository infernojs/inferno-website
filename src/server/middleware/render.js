import Inferno from 'inferno'
import { renderToStaticMarkup } from 'inferno-server'
import { match, RouterContext } from 'inferno-router'
import config from '../config'
import onEnter from '../../../core/helpers/onEnter';
import Html from '../../components/layout/Html'
import routes from '../../routes'

// Server-side render
export default async(ctx, next) => {

    let content = null
    const renderProps = match(routes, ctx.url)

    // Run onEnter methods of matched component
    await onEnter(renderProps)

    content = renderToStaticMarkup(<Html hostname={ctx.hostname} config={config}>
        <RouterContext {...renderProps}/>
    </Html>)

    try {
        ctx.type = 'text/html'
        ctx.body = '<!DOCTYPE html>\n' + content
    } catch(error) {
        if (error.redirect) {
            return ctx.redirect(error.redirect)
        }
        throw error
    }
}
