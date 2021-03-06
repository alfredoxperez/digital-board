'use strict'
// @flow
/* global describe it */
const assert = require('assert')
const cl = require('../lib/util/ConfigLoader')
const merge = require('merge')

describe('ConfigLoader:', function () {
  it('Verify loaded configs', function () {
    cl.loadConfigs(require('../config/test'))
    cl.loadConfigs(require('../config/default'))
    cl.loadConfigs(require('../config/mongodb'))
    const configs = cl.getConfigs()

    assert.deepEqual(
      configs,
      merge(
        require('../config/default'), 
        require('../config/test'),
        require('../config/mongodb'),
        require('../config/digitalboard')))
  })

  it('Verify updated configs', function () {
    const config2 = {
      updated: true
    }
    cl.loadConfigs(config2)
    const configs = cl.getConfigs()

    assert.deepEqual(
      configs, 
      merge(
        require('../config/default'), 
        require('../config/test'),
        require('../config/mongodb'),
        require('../config/digitalboard'),
        config2))
  })
})
