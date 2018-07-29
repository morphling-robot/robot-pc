const path = require('path');
const webpackBase = require('./webpack.base');
const HtmlWepackPlugin = require('html-webpack-plugin');

webpackBase.plugins.push(
	new HtmlWepackPlugin({
		title: 'robot-pc',
		template: path.resolve(__dirname, './template/index.html'),
	})
);

module.exports = Object.assign({}, webpackBase, {
	entry: {
		bundle: [
			path.resolve(__dirname, '../src/rander/index.js')
		]
	},
	mode: 'production',
	output: {
		publicPath: '.',
		filename: 'app.js'
	},
});