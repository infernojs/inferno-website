const path = require('path')

module.exports = {
    http: {
        port: process.env.DEV ? 8080 : 8050,
        favicon: path.join(__dirname, '../assets/favicon.ico')
    },
    server: {
        SSR: true, // Server side rendering
        certificate: '/etc/letsencrypt/live/beta.infernojs.org/fullchain.pem',
        certificate_key: '/etc/letsencrypt/live/beta.infernojs.org/privkey.pem',
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
            url: '/static',
            path: path.join(__dirname, '../docs')
        }
    ]
}
