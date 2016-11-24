import fs from 'fs';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import autoprefixer from 'autoprefixer';
import rreaddir from 'recursive-readdir-sync';
import minimatch from 'minimatch';
import config from './src/config.json';

const CONTENT = rreaddir('content').filter(minimatch.filter('**/*.md')).filter(minimatch.filter('!content/lang/**')).map( s => '/'+s );
const ENV = process.env.NODE_ENV || 'development';
const VENDORS = /\bbabel\-standalone\b/;
const CSS_MAPS = ENV!=='production';

module.exports = {
	context: `${__dirname}/src`,
	entry: './index.js',

	output: {
		path: `${__dirname}/build`,
		publicPath: '/',
		filename: 'bundle.[hash].js',
		chunkFilename: '[name].[chunkhash].chunk.js'
	},
	resolve: {
		extensions: ['', '.jsx', '.js', '.json', '.scss'],
		modulesDirectories: [
			`${__dirname}/src/lib`,
			`${__dirname}/node_modules`,
			'node_modules'
		],
		alias: {
			components: `${__dirname}/src/components`,
			style: `${__dirname}/src/style`
		}
	},
	module: {
		noParse: [VENDORS],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.(scss|css)$/,
				include: /src\/components\//,
				loader: ExtractTextPlugin.extract('style', [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				])
			},
			{
				test: /\.(scss|css)$/,
				exclude: [/src\/components\//, VENDORS],
				loader: ExtractTextPlugin.extract('style', [
					'style-loader',
					'css-loader',
					'postcss-loader',
					'sass-loader'
				].join('!'))
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(xml|html|txt|md)$/,
				exclude: [/src\/index\.html$/],
				loader: 'raw'
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				loader: ENV==='production' ? 'file?name=[path][name]_[hash:base64:5].[ext]' : 'url'
			}
		]
	},
	postcss: () => [
		autoprefixer({ browsers: 'last 2 versions' })
	],
	plugins: ([
		new ProgressBarPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('style.[chunkhash].css', {
			allChunks: false,
			disable: ENV!=='production'
		}),
		new webpack.DefinePlugin({
			process: {},
			'process.env': {},
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			favicon: `${__dirname}/src/assets/favicon.ico`,
			title: config.title,
			config
		})
	]),
	stats: false,

	node: {
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	},
	devServer: {
		port: process.env.PORT || 8080,
		host: '0.0.0.0',
		publicPath: '/',
		quiet: true,
		clientLogLevel: 'error',
		compress: true,
		contentBase: `${__dirname}/src`,
		historyApiFallback: true,
		setup(app) {
			app.use('/content/**', (req, res) => {
				fs.createReadStream(`content/${req.params[0]}`).pipe(res);
			});
		}
	}	
}