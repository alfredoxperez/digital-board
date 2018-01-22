// @flow
'use strict'

/**
 * Utilities.js
 * 
 */

module.exports = {
  copyObject: function(json: Object) {
    return JSON.parse(JSON.stringify(json))
  }
}