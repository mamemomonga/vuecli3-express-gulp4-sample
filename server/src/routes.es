'use strict'
import express from 'express'
const router = express.Router()

router.get('/hello',(req,res)=>{
	res.header('Content-Type','text/plain; charset=utf8')
	res.end('Hello World!')
})

router.get('/api',(req,res)=>{
	const data={"result": { "key": "value" }}
	res.header('Content-Type','application/json')
	res.send(JSON.stringify(data,null,3))
})

export default router

