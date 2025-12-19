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
      path.join(__dirname, '../../core/polyfills.js'),
      path.join(__dirname, '../../src/client.js')
    ]
  },
  output: {
    publicPath: '/build/',
    pathinfo: true
  },
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
  },
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
  new webpack.WatchIgnorePlugin({
    paths: [
      path.join(__dirname, '../../build')
    ]
  })
]);

// Run DEV server for hot-reloading
//---------------------------------
const compiler = webpack(config);
const port = http.port + 2;

const devServer = new WebpackDevServer(
  {
    host: 'localhost',
    port,
    compress: true,
    hot: true,
    allowedHosts: 'all',
    static: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
    },
    devMiddleware: {
      publicPath: config.output.publicPath
    }
  },
  compiler
);

devServer.startCallback((err) => {
  if (err) return logger('webpack:error', err);

  logger('webpack:compiler')('Running on port ' + port);
});
