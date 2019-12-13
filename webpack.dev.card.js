const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
	// mode: 'development', //development || production
	cache: true,
	performance: {
		hints: false
	},
	entry: './src/card.js',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'cardcard'),
	},
	devtool: 'inline-source-map',
	optimization: {
		namedModules: true,
		namedChunks: true,
		nodeEnv: 'development',
		flagIncludedChunks: false,
		occurrenceOrder: false,
		sideEffects: false,
		usedExports: false,
		concatenateModules: false,
		noEmitOnErrors: false,
		checkWasmTypes: false,
		minimize: false,
		removeAvailableModules: false
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.NamedChunksPlugin(),
		new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
		new webpack.EvalSourceMapDevToolPlugin({
			module: true,
			columns: true,
			exclude: [/jquery/]
		})
	],
	devServer: {
		open: false,
		contentBase: './card'
	}
});