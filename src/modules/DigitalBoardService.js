// @flow
'use strict';

import type {DigitalBoardItemTemplate} from '../../config/digitalboard'
import type {DigitalBoardReturnedItemTemplate} from '../../config/digitalboard'
const log           = require('../util/Logger')
const configLoader  = require('../util/ConfigLoader')
const util          = require('../util/Utilities')
const configs       = configLoader.getConfigs()



/**
 * DigitalBoardService.js
 * 
 */
let _io: any = null;
const outboundDigitalBoardSocket: string = configs.outboundDigitalBoardSocket
const digitalBoardItemTemplate: DigitalBoardItemTemplate = configs.DigitalBoardItemTemplate
const digitalBoardReturnedItemTemplate: DigitalBoardReturnedItemTemplate = configs.DigitalBoardReturnedItemTemplate
let boardHistory: Array<DigitalBoardItemTemplate> = []


function buildDigitalBoardReturnedItem(text: string, row: number = -1) {
  let dbri = util.copyObject(digitalBoardReturnedItemTemplate)
  dbri.boardText = text
  dbri.row = row
  return dbri
}

/**
 * updateDigitalBoard()
 * @param {*} inText 
 */
const updateDigitalBoard = function(inText: string) {
  let dbi = util.copyObject(digitalBoardItemTemplate)
  dbi.dateTime = (new Date()).getTime()
  dbi.boardText = inText
  boardHistory.push(dbi)

  const dbri = buildDigitalBoardReturnedItem(inText)
  if(_io) {
    _io.emit(outboundDigitalBoardSocket, dbri)
    log.info('DigitalBoardService: emitting: ', dbri)
  } else {
    log.err('DigitalBoard: could not emit stats: socket.io is not available')
  }
}

const updateDigitalBoardRow = function(row: number) {
  if(row <= boardHistory.length) {
    //we're striking..
    if(!boardHistory[boardHistory.length-row].isDone) {
      boardHistory[boardHistory.length-row].boardText = 
        util.strikeText(boardHistory[boardHistory.length-row].boardText)
      boardHistory[boardHistory.length-row].isDone = true
    } else {
      //else unstrike
      boardHistory[boardHistory.length-row].boardText = 
        util.unStrikeText(boardHistory[boardHistory.length-row].boardText)
      boardHistory[boardHistory.length-row].isDone = false
    }

    const dbri = buildDigitalBoardReturnedItem(
      boardHistory[boardHistory.length-row].boardText, row)
  
    if(_io) {
      _io.emit(outboundDigitalBoardSocket, dbri)
      log.info('DigitalBoardService: emitting: ', dbri)
    } else {
      log.err('DigitalBoard: could not emit stats: socket.io is not available')
    } 
  }
}

/**
 * getAll()
 */
const getAll = function() {
  log.info('DigitalBoard: getAll()')
  let row = boardHistory.length
  return boardHistory.map((e) => buildDigitalBoardReturnedItem(e.boardText, row--))
}


/**
 * init(io)
 **/
const init = function(io: any, disableCron: boolean) {
  _io = io
  _io.on('connection', function(socket){})
  log.info('DigitalBoardService initialized.');
}

module.exports = {
  init: init,
  updateDigitalBoard: updateDigitalBoard,
  updateDigitalBoardRow: updateDigitalBoardRow,
  getAll, getAll
}