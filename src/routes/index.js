// @flow
'use strict'
const express = require('express')
const router = express.Router()
const DigitalBoardService  = require('../modules/DigitalBoardService')


/**
 * Front End...
 */
//GET: http://localhost:3000/
router.get('/', function(req, res){
  res.sendFile('index.html', {root: './public'})
})


/**
 * API...
 */
//GET: http://localhost:3000/digital-board/api/1.0/text
router.get('/text', function(req, res){
  res.setHeader('Content-Type', 'application/json')
  res.status(200)
  res.send(DigitalBoardService.getAll())
})


//PUT: http://localhost:3000/digital-board/api/1.0/text
router.put('/text', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  if(req.body && req.body.inputText) {
    DigitalBoardService.updateDigitalBoard(req.body.inputText)
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
})

//POST: http://localhost:3000/digital-board/api/1.0/text
router.post('/text', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  if(req.body && req.body.row) {
    DigitalBoardService.updateDigitalBoardRow(req.body.row)
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
})


module.exports = router
