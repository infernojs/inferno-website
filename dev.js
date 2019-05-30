/**
 * Bootstrap core and webpack
 */
require('./core/compile');

global.window = global.window || {};

require('./start')
/**
 * Bootstrap our server
 * 
 * @todo should compile first, or just use direct `require`
 */
require("@babel/register");
require('./src/server/server');
