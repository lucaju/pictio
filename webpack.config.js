const path = require ('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode:  'development', //production
	entry: './public/js/app.js',
	plugins: [
		new CleanWebpackPlugin(['public/dist'])
	],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './public/dist'
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'public/dist'),
		publicPath: '/dev'
	}
};