const path = require('path')
const webpack = require('webpack')
const ExtractCSS = require('extract-text-webpack-plugin')
const sources = (location) => path.join(__dirname, '../../src', location)

module.exports = {
    entry: {},
    node: {
        global: true,
        node: true,
        fs: 'empty'
    },
    performance: {
        hints: false
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    sources(''),
					sources('../core')
				],
                exclude: [sources('docs')],
                query: {
                    cacheDirectory: false,
                    presets: [],
                    plugins: [
                        "add-module-exports",
                        "transform-es2015-destructuring",
                        "transform-object-rest-spread",
                        "transform-decorators-legacy",
                        "transform-class-properties",
                        "inferno",
                        ["fast-async"]
                    ]
                }
            },
            {
                test: /\.(jpg|png|svg)(\?.+)?$/,
                loader: 'url-loader?limit=100000',
                include: [sources('assets'), sources('client/components')]
            },
            {
                test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
                loader: 'file-loader',
                include: [sources('assets'), sources('client/components')]
            },
            {
                test: /\.(css|scss)(\?.+)?$/,
                loader: ExtractCSS.extract(['css-loader?sourceMap', 'sass-loader?sourceMap']),
                include: [sources('assets'), sources('client/components')]
            },
            {
                test: /\.md$/,
                loader: 'html-loader!markdown-loader',
                include: [sources('docs'), sources('client/components')]
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: [sources('src')]
            }
        ]
    },

    output: {
        filename: 'bundle.js',
        sourcePrefix: '',
        path: path.resolve(__dirname, '../../build')
    },

    resolve: {
        alias: {
            'core': path.join(__dirname, '../')
        }
    },

    plugins: [
        new ExtractCSS({ filename: 'bundle.css', allChunks: true })
    ]
};
