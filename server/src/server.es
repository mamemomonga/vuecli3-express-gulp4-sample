'use strict'
import express from 'express'
import request from 'request'
import morgan from 'morgan'
import cors from 'cors'
import history from 'connect-history-api-fallback'
import querystring from 'querystring'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import routes from './routes.es'

const serve_port=8888
const app = express()
const PRODUCTION = process.env.NODE_ENV === 'production' ? true : false

app.use(morgan({ format: 'combined', immediate: true }))
	.use(cors())
	.use(cookieParser())
	.use(bodyParser.json())
	.use('/',routes)
	.use(history({ verbose: false, index: '/index.html' }))
	.use(express.static(`${__dirname}/public`))
	.listen(serve_port)

console.log(`Listening on ${serve_port}`)
