const path = require('path');
const webpack = require('webpack');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
	mode: 'development', //production
	entry: './src/card.js',
	output: {
		filename: 'card.bundle.js',
		path: path.resolve(__dirname, 'card'),
	},
	devServer: {
		contentBase: './card'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader',
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true, // webpack@1.x
							disable: true, // webpack@2.x and newer
						},
					},
				],
			},
			{
				test: /\.html$/,
				use: 'mustache-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(
			// [
			// 	'./dashboard'
			// ]
		),
		new HtmlWebpackPlugin({
			inject: false,
			template: require('html-webpack-template'),
			appMountId: 'app',
			appMountHtmlSnippet: '<div id="view" class="uk-height-1-1 uk-section uk-background-default" uk-height-viewport></div>',
			filename:'index.html',
			meta: [
				{
					name: 'charset',
					content: 'utf-8'
				},
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
				},
				{
					name: 'apple-mobile-web-app-capable',
					content: 'yes'
				}
			],
			title: 'Pict.io - card'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'window.$': 'jquery'
		}),
		new WebpackBar(),
		// new BundleAnalyzerPlugin()
	]
};