// gulpfile.babel.js
'use strict'
import { task, src, dest, series, parallel, watch } from 'gulp'
import log from 'fancy-log'
import gls from 'gulp-live-server'
import webpack_server from './gulp_webpack_server.js'
import fs from 'fs'
import { spawn } from 'child_process'
import rimraf from 'rimraf'

// 動作モードの定義
const PRODUCTION = ( process.env.NODE_ENV === 'production' ) ? true : false
const ENV_PATH = PRODUCTION ? 'prod': 'dev'
if(PRODUCTION) {
	log.info("PRODUCTION MODE")
} else {
	log.info("DEVELOPMENT MODE")
	process.env.NODE_ENV='development'
}

// tasks

// クリーンアップ
task('clean',(done)=>{
	rimraf(`../dist/${ENV_PATH}`,done)
})

// clientのビルド
task('client:build',(done)=>{

	// vue.config.js の生成
	// https://cli.vuejs.org/config/
	const vue_config={
		publicPath: '/',
		assetsDir: './assets',
		outputDir: `../dist/${ENV_PATH}/public`,
		productionSourceMap: false
	}
	fs.writeFileSync('client/vue.config.js','module.exports='+ JSON.stringify(vue_config) +'')

	// yarn --cwd client build の実行
	spawn('yarn',['--cwd','client','build'],{ stdio: 'inherit' }).on('close',(code)=>{ done() })
})

// serverのビルド
task('server:build',()=>{
	return src('./server/src/server.es')
	.pipe(webpack_server({
		// 埋め込まないモジュール
		externals: [
			'express',
			'request',
			'cors',
			'querystring',
			'cookie-parser',
			'body-parser',
		],
		// ファイル名
		filename: 'server.js'
	}))
	.pipe(dest(`dist/${ENV_PATH}/`))
})

task('build',series('clean','client:build','server:build'))

task('serve',()=>{

	const server=gls(`dist/${ENV_PATH}/server.js`,{
		env: { NODE_ENV: process.env.NODE_ENV }
	})
	server.start()

	// 更新監視
	if(PRODUCTION) { return }

	watch('./src/server/*.es',series(
		'server:build',
		(done)=>{ server.start(); done() }
	))

	watch('./client/**/**',series(
		'client:build',
		(done)=>{ server.start(); done() }
	))

})

task('default',series('build','serve'))

