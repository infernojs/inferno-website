/**
 * Bootstrap our server
 * 
 * @todo should compile first, or just use direct `require`
 */
require("@babel/register");
require('./src/server/server');
