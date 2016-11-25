import { observable } from 'mobx'

// All our actions are listed here
export default {
    common: observable({
        title: 'Inferno',
        hostname: 'infernojs.org',
        description: 'Just a test'
    })
}
