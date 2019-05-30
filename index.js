/**
 * @todo remove
 * this is here just because `/dist` is flattened in deployed code 
 * and since we have two builders (_1 static, 1 nodejs with this file as the entry point_)
 * we have 
 * - index.js
 * - /core
 * - /public
 * - /src 
 * ^ but in local those are in /dist/public...
 */
const {existsSync} = require('fs')
const {resolve} = require('path')
const distPath = resolve(__dirname, './dist')
const doesDistExist = existsSync(distPath)
// make it hard to eval, so it doesn't try to compile src
const requirePathPrefix = doesDistExist ? './dist/' : './'
module.exports = require(requirePathPrefix + 'src/server/server')
