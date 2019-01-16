// サーバ向け WebPack処理
'use strict'
import webpack from 'webpack-stream'

const PRODUCTION = ( process.env.NODE_ENV === 'production' ) ? true : false

const config = {
	// 埋め込まないモジュール
	externals: [
		'express',
		'request',
		'cors',
		'querystring',
		'cookie-parser',
		'body-parser',
		'connect-history-api-fallback',
		'morgan'
	],
	// ファイル名
	filename: 'server.js'
}

export default function(){
	return webpack({
		node: {
			__dirname: false,
			__filename: false,
			process: false,
		},
		devtool: PRODUCTION ? undefined : 'source-map',
		mode: PRODUCTION ? 'production' : 'development',
		module: { rules: [{
			test: /\.js$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [ "@babel/preset-env" ]
				}
			}
		}]},
		externals: config.externals,
		output: {
			filename: config.filename,
			libraryTarget: 'commonjs2'
		}
	})
}

