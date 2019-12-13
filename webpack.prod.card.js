const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
	// mode: 'production',
	entry: './src/card.js',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'card'),
	},
	devtool: false,
	performance: {
		hints: 'warning'
	},
	plugins: [
		new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index-card.html',
			inject: 'body'
		}),
	],
	optimization: {
		namedModules: false,
		namedChunks: false,
		nodeEnv: 'production',
		flagIncludedChunks: true,
		occurrenceOrder: true,
		sideEffects: true,
		usedExports: true,
		concatenateModules: true,
		noEmitOnErrors: true,
		checkWasmTypes: true,
		minimize: true,
		minimizer: [new TerserPlugin({
			cache: true,
			parallel: true,
			sourceMap: false//true
		})]
	},
});