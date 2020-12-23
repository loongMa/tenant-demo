const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = webpackMerge(baseConfig, {
	mode: 'development',
	devServer: {
		publicPath: '/',
		host: '127.0.0.1',
		port: '3000',
	}
})
