const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve('.', 'src/app.js'),
	output: {
		path: path.resolve('.', 'dist'),
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.js[x]?$/,
				exclude: /(node_modules)/,
				include:　path.resolve('.', 'src'),
				use: [{
					loader: "babel-loader",
				}]
			},
			{
				test: /\.(le|c)ss$/,
				use: [{
					loader: 'style-loader',
				}, {
					loader: require.resolve('css-loader'),
				}, {
					loader: require.resolve('postcss-loader'),
				}, {
					loader: require.resolve('less-loader'),
				}]
			},
			{
				test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
				exclude: /favicon\.png$/,
				use: [{
					loader: "url-loader",
					options: {
						limit: 1,
						name: "images/[hash:4].[name].[ext]"
					}
				}]
			},
			{
				test: /\.(eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				use: [{
					loader: "file-loader",
					options: {
						name: "fonts/[name].[ext]"
					}
				}]
			}]
	},
	resolve: {
		extensions: [
			".jsx", ".js", ".less", ".css", ".json"
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].css'
		}),
		new HtmlWebpackPlugin({
			template: path.resolve('.', 'src/index.html'),
			filename: "index.html",
			inject: 'body'
		})
	]
}
