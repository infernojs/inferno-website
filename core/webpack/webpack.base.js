const { join } = require('path');
const Copy = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const root = join(__dirname, '..', '..');
const pubDir = join(root, 'public');
const srcDir = join(root, 'src');

const src = loc => join(srcDir, loc);

module.exports = {
  mode: 'none',
  entry: {},
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          srcDir,
        ],
        exclude: [src('docs')],
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            cacheDirectory: false,
            presets: [
              [
                '@babel/env',
                {
                  'targets': {
                    'browsers': ['>0.4%'],
                  }
                },
              ],
            ],
            plugins: [
              [
                'babel-plugin-inferno',
                {
                  'imports': true,
                  'defineAllArguments': true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(jpg|png|svg)(\?.+)?$/,
        loader: 'url-loader',
        options: {
          limit: 100000
        },
        include: [
          src('assets'),
          src('client/components'),
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
        loader: 'file-loader',
        include: [
          src('assets'),
          src('client/components'),
        ],
      },
      {
        test: /\.(css|scss)(\?.+)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.md$/,
        use: ['markdown-loader'],
        include: [
          src('docs'),
          src('client/components'),
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: [srcDir],
      },
    ],
  },

  output: {
    sourcePrefix: '',
    filename: 'bundle.js',
    path: join(pubDir, 'build'),
  },

  resolve: {
    mainFields: ['module', 'browser', 'module', 'main'],
    alias: {
      'core': join(__dirname, '../'),
    },
  },

  plugins: [
    new Copy({
      patterns: [
        { context: srcDir, from: 'docs/**', to: pubDir },
        { context: srcDir, from: 'assets/*', to: pubDir },
        { context: srcDir, from: 'index.html', to: pubDir },
        { context: srcDir, from: 'assets/s*/**', to: pubDir },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ]

};
