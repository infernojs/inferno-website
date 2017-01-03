const { join } = require('path');
const webpack = require('webpack')
const Copy = require('copy-webpack-plugin')
const Clean = require('clean-webpack-plugin')
const ExtractCSS = require('extract-text-webpack-plugin')

const root = join(__dirname, '..', '..')
const pubDir = join(root, 'public')
const srcDir = join(root, 'src')

const src = loc => join(srcDir, loc)

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
                    srcDir,
					src('../core'),
					src('../node_modules/babel-plugin-inferno')
				],
                exclude: [src('docs')],
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
                include: [src('assets'), src('client/components')]
            },
            {
                test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
                loader: 'file-loader',
                include: [src('assets'), src('client/components')]
            },
            {
                test: /\.(css|scss)(\?.+)?$/,
                loader: ExtractCSS.extract(['css-loader?sourceMap&minimize', 'sass-loader?sourceMap&minimize']),
                include: [src('assets'), src('client/components')]
            },
            {
                test: /\.md$/,
                loader: 'html-loader!markdown-loader',
                include: [src('docs'), src('client/components')]
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: [srcDir]
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
        new Copy([
            {context: srcDir, from: 'docs/**', to: pubDir},
            {context: srcDir, from: 'assets/**', to: pubDir}
        ]),
        new ExtractCSS({ filename: 'bundle.css', allChunks: true })
    ]
};
