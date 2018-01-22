'use strict'
// @flow
/* global describe it */
const app = require('../lib/app.js')
const cl = require('../lib/util/ConfigLoader')
const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const configs = cl.getConfigs()
const apiUri = '/'
  + configs.applicationName
  + '/api/'
  + configs.apiVersion

describe('RoutesTest:', function () {
  it('/text should return a 200', function (done) {
    chai.request(app)
      .get(apiUri + '/text')
      .end(function (err, res) {
        setTimeout(function(){
          assert.equal(res.status, 200)
          done()
        }, 1500)
      })
  })
})
