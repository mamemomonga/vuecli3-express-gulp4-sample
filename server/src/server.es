'use strict'
import express from 'express'
import request from 'request'
import cors from 'cors'
import querystring from 'querystring'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const serve_port=8888
const app = express()

app.use(express.static(`${__dirname}/public`))
	.use(cors())
	.use(cookieParser())
	.use(bodyParser.json())

app.get('/hello',(req,res)=>{
	res.header('Content-Type','text/plain; charset=utf8')
	res.end('Hello World!')
})

console.log(`Listening on ${serve_port}`)
app.listen(serve_port)
