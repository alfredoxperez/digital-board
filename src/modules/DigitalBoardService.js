// @flow
'use strict';

import type {DigitalBoardItemTemplate} from '../../config/digitalboard';
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
let boardHistory: Array<DigitalBoardItemTemplate> = []


/**
 * updateDigitalBoard()
 * @param {*} inText 
 */
const updateDigitalBoard = function(inText: string) {
  let dbi = util.copyObject(digitalBoardItemTemplate)
  dbi.dateTime = (new Date()).getTime()
  dbi.boardText = inText
  boardHistory.push(dbi)

  if(_io) {
    _io.emit(outboundDigitalBoardSocket, inText)
    log.info('DigitalBoardService: emitting: ' + inText)
  } else {
    log.err('DigitalBoard: could not emit stats: socket.io is not available')
  }
}

/**
 * getAll()
 */
const getAll = function() {
  log.info('DigitalBoard: getAll()')
  return boardHistory
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
  getAll, getAll
}