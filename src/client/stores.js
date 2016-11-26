import { observable } from 'mobx'

// All our actions are listed here
function createStores(state, hostname) {
    return {
        common: observable({
            title: 'Inferno',
            hostname: hostname || 'infernojs.org',
            description: 'Just a test'
        })
    }
}

export default process.env.BROWSER ? createStores(window.__STATE) : createStores
