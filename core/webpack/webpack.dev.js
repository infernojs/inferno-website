const path = require('path');
const logger = require('debug');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.base.js');
const { http } = require('../../src/server/config');

// Merge with base configuration
//-------------------------------
Object.assign(config, {
  cache: true,
  devtool: false, // eval eval-cheap-module-source-map source-map
  entry: {
    bundle: [
      `webpack-dev-server/client?http://localhost:${http.port + 2}`,
      'webpack/hot/only-dev-server',
      path.join(__dirname, '../../core/polyfills.js'),
      path.join(__dirname, '../../src/client.js')
    ]
  },
  output: {
    publicPath: `http://localhost:${http.port + 2}/build/`,
    libraryTarget: 'var',
    pathinfo: true
  }
});

// Plugins
//-------------------------------
config.plugins = config.plugins.concat([
  new webpack.EnvironmentPlugin({
    'DEV': true,
    'BROWSER': true,
    'NODE_ENV': JSON.stringify('development')
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.WatchIgnorePlugin([
    path.join(__dirname, '../../build')
  ])
]);

// Run DEV server for hot-reloading
//---------------------------------
const compiler = webpack(config);
const port = http.port + 2;

new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
  },
  hot: true,
  compress: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: false
  },
  stats: {
    colors: true,
    hash: false,
    timings: false,
    version: false,
    chunks: false,
    modules: false,
    children: false,
    chunkModules: false
  }
}).listen(port, 'localhost', function(err) {
  if (err) return logger('webpack:error', err);

  logger('webpack:compiler')('Running on port ' + port);
});
