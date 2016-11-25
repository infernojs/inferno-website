/**
 * Bootstrap our server
 */
require('isomorphic-fetch')
require('./logger')
require('./polyfills')

// Compile files on PROD or launch DEV server
if (process.env.NODE_ENV === 'production') {
    require('./webpack/webpack.prod.js')
} else {
    process.env.DEV = true
    require('./webpack/webpack.dev.js')
}

require('babel-register')
require('../src/server/server')
