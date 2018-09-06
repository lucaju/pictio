const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development', //production
	entry: './game/app.js',
	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			template: require('html-webpack-template'),
			appMountId: 'app',
			appMountHtmlSnippet: `  <div class="uk-offcanvas-content" uk-height-viewport>
			  <div id="view" class="uk-height-1-1 uk-section uk-background-default"></div>
			</div>`,
			// googleAnalytics: {
			// 	trackingId: 'UA-XXXX-XX',
			// 	pageViewOnLoad: true
			// },
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
			title: 'Pict.io'
		}),
		new CleanWebpackPlugin(['game/dist']),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'window.$': 'jquery'
		})
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './game/dist'
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'game/dist'),
	},
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
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.html$/,
				use: 'mustache-loader'
				// loader: 'mustache-loader?minify'
				// loader: 'mustache-loader?{ minify: { removeComments: false } }'
				// loader: 'mustache-loader?noShortcut'
			}
		]
	},
};