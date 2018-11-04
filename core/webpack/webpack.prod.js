const logger = require('debug');
const { join } = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.js');
const SWPrecache = require('sw-precache-webpack-plugin');

// Merge with base configuration
//-------------------------------
Object.assign(config, {
  mode: 'production',
  cache: false,
  devtool: false,
  entry: {
    bundle: [
      join(__dirname, '../../core/polyfills.js'),
      join(__dirname, '../../src/client.js')
    ]
    //react: join(__dirname, '../../src/components/demo/Demo.React.js')
  },
  output: {
    publicPath: '/build/'
  }
});

logger('server:webpack')('Environment: Production');

// Save files to disk
//-------------------------------
const pubDir = join(__dirname, '..', '..', 'public');
config.output.path = join(pubDir, 'build');
config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new SWPrecache({
    cacheId: 'infernojs-site',
    staticFileGlobs: ['public/**'],
    navigateFallback: 'public/index.html',
    staticFileGlobsIgnorePatterns: [/\.map$/],
    filepath: 'public/offline.js',
    verbose: true,
    stripPrefixMulti: {
      'public/': '/'
    },
    runtimeCaching: [
      {
        handler: 'networkFirst',
        urlPattern: /\/api\/markdown/, // urlPattern: /infernojs\.org\/api\/markdown/,
      },
      {
        handler: 'cacheFirst',
        urlPattern: /(cdnjs\.cloudflare\.com)|(cdn\.polyfill\.io)/,
      }
    ]
  })
);

// Plugins
//-------------------------------
config.plugins = config.plugins.concat([
  new webpack.EnvironmentPlugin({
    'DEV': false,
    'BROWSER': true,
    'NODE_ENV': JSON.stringify('production')
  }),
]);


// Sanity checks
//-------------------------------
if (config.devtool === 'eval') {
  throw new Error('Using "eval" source-maps may break the build');
}

// Compile everything for PROD
//-------------------------------
const compiler = webpack(config);
compiler.run(function(err, stats) {
  if (err) throw err;

  // Output stats
  console.log(stats.toString({
    colors: true,
    hash: false,
    chunks: false,
    version: false,
    children: false,
    chunkModules: false
  }));

  // Write a stats.json for the webpack bundle visualizer
  //writeWebpackStats(stats)

  if (stats.hasErrors()) {
    logger('webpack:error')(stats.compilation.errors.toString());
  }
  logger('webpack:compiler')('Finished compiling');
});
