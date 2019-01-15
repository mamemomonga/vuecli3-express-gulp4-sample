// サーバ向け WebPack処理
'use strict'
import webpack from 'webpack-stream'

const PRODUCTION = ( process.env.NODE_ENV === 'production' ) ? true : false

export default function(args){
	return webpack({
		node: {
			__dirname: false,
			__filename: false,
			process: false,
		},
		devtool: PRODUCTION ? undefined : 'source-map',
		mode: PRODUCTION ? 'production' : 'development',
		module: { rules: [{
			test: /\.es$/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [ "@babel/preset-env" ]
				}
			}
		}]},
		externals: args.externals,
		output: {
			filename: args.filename,
			libraryTarget: 'commonjs2'
		}
	})
}

