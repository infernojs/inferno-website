import createStores from '../../client/stores'

/**
 * Middleware for creating the context
 * @param ctx
 * @param next
 */
export default async(ctx, next) => {
    // Create the state
    const state = {}

    // Finally initialize state. This should come last
    ctx.stores = createStores(state, ctx.headers.host)

    await next()
}
