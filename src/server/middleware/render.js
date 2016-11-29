import Inferno from 'inferno'
import { renderToStaticMarkup } from 'inferno-server'
import { match } from 'inferno-router'
import config from '../config'
import onEnter from '../../../core/helpers/onEnter';
import Html from '../../components/layout/Html'
import routes from '../../routes'

// Server-side render
export default async(ctx, next) => {

    const renderProps = match(routes, ctx.url)
    const content = <Html hostname={ctx.hostname} config={config}/>

    // Run onEnter methods of matched component
    await onEnter(renderProps)

    try {
        ctx.body = '<!DOCTYPE html>\n' + renderToStaticMarkup(content)
    } catch(error) {
        if (error.redirect) {
            return ctx.redirect(error.redirect)
        }
        throw error
    }
}
