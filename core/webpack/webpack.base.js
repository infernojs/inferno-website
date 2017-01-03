const { join } = require('path');
const webpack = require('webpack')
const Copy = require('copy-webpack-plugin')
const Clean = require('clean-webpack-plugin')
const ExtractCSS = require('extract-text-webpack-plugin')

const root = join(__dirname, '..', '..')

const sources = (location) => join(root, 'src', location)

module.exports = {
    entry: {},
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
					sources('../core'),
					sources('../node_modules/babel-plugin-inferno')
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
                loader: ExtractCSS.extract(['css-loader?sourceMap&minimize', 'sass-loader?sourceMap&minimize']),
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
        path: sources('build')
    },

    resolve: {
        alias: {
            'core': join(__dirname, '../')
        }
    },

    plugins: [
        new Clean(['build', 'public'], {root: root}),
        new ExtractCSS({ filename: 'bundle.css', allChunks: true })
    ]
};
