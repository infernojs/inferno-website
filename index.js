/**
 * Bootstrap core and webpack
 */
require('./core/compile')

global.window = global.window || {}

/**
 * Bootstrap our server
 */
require('babel-register')
require('./src/server/server')
