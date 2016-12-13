const path = require('path')

module.exports = {
    http: {
        port: process.env.DEV ? 8080 : 8050,
        favicon: path.join(__dirname, '../assets/favicon.ico')
    },
    static: [
        {
            url: '/build',
            path: path.join(__dirname, '../../build')
        },
        {
            url: '/assets',
            path: path.join(__dirname, '../assets')
        },
        {
            url: '/service',
            path: path.join(__dirname, '../assets/service')
        },
        {
            url: '/static',
            path: path.join(__dirname, '../docs')
        }
    ]
}
