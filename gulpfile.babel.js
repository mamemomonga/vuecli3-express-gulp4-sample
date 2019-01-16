// ------------------
// gulpfile.babel.js
// ------------------
'use strict'
import { task, src, dest, series, parallel, watch } from 'gulp'
import log from 'fancy-log'
import gls from 'gulp-live-server'
import { spawn } from 'child_process'
import rimraf from 'rimraf'

import webpack4server from './gulp/webpack4server.js'
import vueconfgen from './gulp/vueconfgen.js'

// ------------------
// 動作モードの定義
// ------------------
const PRODUCTION = ( process.env.NODE_ENV === 'production' ) ? true : false
const ENV_PATH = PRODUCTION ? 'prod': 'dev'
if(PRODUCTION) {
	log.info("PRODUCTION MODE")
} else {
	log.info("DEVELOPMENT MODE")
	process.env.NODE_ENV='development'
}

// ------------------
// tasks
// ------------------

// クリーンアップ
task('clean',(done)=>{
	rimraf(`../dist/${ENV_PATH}`,done)
})

// clientのビルド
task('client:build',(done)=>{
	vueconfgen()
	// yarn --cwd client build の実行
	spawn('yarn',['--cwd','client','build'],{ stdio: 'inherit' }).on('close',(code)=>{ done() })
})

// serverのビルド
task('server:build',()=>{
	return src('./server/src/server.js')
	.pipe(webpack4server())
	.pipe(dest(`dist/${ENV_PATH}/`))
})

task('build',series('clean','client:build','server:build'))

task('serve:start',()=>{

	const server=gls(`dist/${ENV_PATH}/server.js`,{
		env: { NODE_ENV: process.env.NODE_ENV },
		livereload: false
	})
	server.start()

	watch('./server/src/**/**',series(
		'server:build',
		(done)=>{ server.start(); done() }
	))

	watch('./client/(public|src)/**',series(
		'client:build',
		(done)=>{ server.start(); done() }
	))

})

task('serve',  series('build','serve:start'))
task('default',series('serve'))

