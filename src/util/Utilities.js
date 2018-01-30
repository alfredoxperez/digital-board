// @flow
'use strict'

/**
 * Utilities.js
 * 
 */

module.exports = {
  copyObject: function(json: Object) {
    return JSON.parse(JSON.stringify(json))
  },
  strikeText: function(str: String){
    return str.replace(/./g, (chr) => {return chr + '\u0336'})
  },
  unStrikeText: function(str: String){
    return str.replace(/[^\x00-\x7F]/g, "")
  }
}