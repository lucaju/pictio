const path = require ('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode:  'development', //production
	entry: './public/js/app.js',
	plugins: [
		new CleanWebpackPlugin(['public/dist']),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'window.$': 'jquery'
		})
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './public/dist'
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'public/dist'),
		publicPath: '/dev'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loaders: ['style-loader','css-loader']
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader:'file-loader',
				options:{
					name:'[name].[ext]',
					outputPath:'assets/images/'
				//the images will be emited to dist/assets/images/ folder
				}
			}
		]
	},
};