const {join} = require('path');
const Copy = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');

const root = join(__dirname, '..', '..');
const pubDir = join(root, 'public');
const srcDir = join(root, 'src');

const src = loc => join(srcDir, loc);

module.exports = {
    mode: 'none',
    entry: {},
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    srcDir,
                    src('../core'),
                    src('../node_modules/babel-plugin-inferno')
                ],
                exclude: [src('docs')],
                query: {
                    babelrc: false,
                    cacheDirectory: false,
                    presets: [
                      [
                        "@babel/env",
                        {
                          "targets": {
                            "browsers": [ ">0.25%", "ie >= 11"]
                          },
                          "loose": true
                        }
                      ]
                    ],
                    plugins: [
                        [
                            "babel-plugin-inferno",
                            {
                                "imports": true,
                                "defineAllArguments": true
                            }
                        ],
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-proposal-object-rest-spread",
                        "@babel/plugin-transform-async-to-generator",
                        ["module:fast-async"]
                    ]
                }
            },
            {
                test: /\.(jpg|png|svg)(\?.+)?$/,
                loader: 'url-loader?limit=100000',
                include: [
                    src('assets'),
                    src('client/components')
                ]
            },
            {
                test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
                loader: 'file-loader',
                include: [
                    src('assets'),
                    src('client/components')
                ]
            },
            {
                test: /\.(css|scss)(\?.+)?$/,
                use: [

                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.md$/,
                loader: 'html-loader!markdown-loader',
                include: [
                    src('docs'),
                    src('client/components')
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: [srcDir]
            }
        ]
    },

    output: {
        sourcePrefix: '',
        filename: 'bundle.js',
        path: join(pubDir, 'build')
    },

    resolve: {
        mainFields: ['module', 'browser', 'module', 'main'],
        alias: {
            'core': join(__dirname, '../')
        }
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['build', 'public'],
            root: root
        }),
        new Copy({
            patterns: [
              {context: srcDir, from: 'docs/**', to: pubDir},
              {context: srcDir, from: 'assets/*', to: pubDir},
              {context: srcDir, from: 'index.html', to: pubDir},
              {context: srcDir, from: 'assets/s*/**', to: pubDir}
           ]
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
            allChunks: true
        }),
        new OptimizeCssnanoPlugin({
            sourceMap: false,
            cssnanoOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                }],
            },
        }),
    ]
};
