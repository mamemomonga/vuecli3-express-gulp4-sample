'use strict'
import fs from 'fs'

const PRODUCTION = ( process.env.NODE_ENV === 'production' ) ? true : false
const ENV_PATH = PRODUCTION ? 'prod': 'dev'

export default function(){

	// vue.config.js の生成
	// https://cli.vuejs.org/config/
	const vue_config={
		publicPath: '/',
		assetsDir: './assets',
		outputDir: `../dist/${ENV_PATH}/public`,
		productionSourceMap: false
	}
	fs.writeFileSync('client/vue.config.js',
		  "// このファイルは動的に生成されています\n"
		+ "// 編集しないでください\n"
		+ 'module.exports='+ JSON.stringify(vue_config) +"\n"
	)

    // .eslintrc の生成
    // .eslintrc.js だとvue-cliの挙動が少しおかしくなる
	const eslintrc={
		"root": true,
		"env": {
			"node": true
		},
		"extends": [
			"plugin:vue/essential",
			"eslint:recommended"
		],
		"rules": {
			"no-console" : PRODUCTION ? 'error' : 'off'
		},
		"parserOptions": {
			"parser": "babel-eslint"
		}
	}
    fs.writeFileSync('client/.eslintrc',JSON.stringify(eslintrc))
}
