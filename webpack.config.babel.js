import path from 'path';
import os from 'os';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import HappyPack from 'happypack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
export default {
	mode: 'development',
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[hash].bundle.js'
		// publicPath:'/assets/'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['happypack/loader?id=happyBabel']
			},
			{
				test: /\.(png|jpe?g|svg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'images'
						}
					}
				]
			}
		]
	},
	// watch: true,
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
		quiet: true,
		hot: true,
		open:true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'pixi应用',
			favicon: path.resolve('favicon.ico'),
			template: path.join(__dirname,'index.html'),
			filename: 'index.html'
		}),
		new HappyPack({
			//用id来标识 happypack处理那里类文件
			id: 'happyBabel',
			//如何处理  用法和loader 的配置一样
			loaders: [
				{
					loader: 'babel-loader?cacheDirectory=true'
				}
			],
			//共享进程池
			threadPool: happyThreadPool,
			//允许 HappyPack 输出日志
			verbose: true
		}),
		new FriendlyErrorsWebpackPlugin(),
		new ProgressBarPlugin({
			format: '  build [:bar] ' + chalk.blue.bold(':percent') + ' (:elapsed seconds)',
			clear: false
		}),
		// new CleanWebpackPlugin()
	]
};
