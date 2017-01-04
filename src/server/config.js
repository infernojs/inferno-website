const { join } = require('path')

const pubDir = join(__dirname, '../../public')

module.exports = {
    http: {
        port: process.env.DEV ? 8080 : 8050,
        favicon: join(__dirname, '../assets/favicon.ico')
    },
    server: {
        SSR: true, // Server side rendering
        certificate: join(__dirname, '../../fullchain.pem'),
        certificate_key: join(__dirname, '../../privkey.pem'),
    },
    static: [
        {
            url: '/',
            path: pubDir
        },
        {
            url: '/build',
            path: join(pubDir, 'build')
        },
        {
            url: '/assets',
            path: join(pubDir, 'assets')
        },
        {
            url: '/static',
            path: join(pubDir, 'docs')
        }
    ]
}
