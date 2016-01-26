'use strict';

var
  assert = require('chai').assert,
  spec   = require('api-first-spec'),
  heroku = require('./heroku'),
  appname = require('../account.json').heroku_appname;

var API = spec.define({
  "endpoint": "/api/projects/[id]",
  "method": spec.Method.GET,
  "request": {
    "contentType": spec.ContentType.URLENCODED,
  },
  "response": {
    "contentType": spec.ContentType.JSON,
    "data": "any"
  }
});

describe("GET /api/projects/:id", function () {
  var host = spec.host(heroku.origin(appname));

  it("should be not found if not exists", function (done) {
    host.api(API).params({
      id: 999999999
    }).notFound(done);
  });

  it("should succeed if exsits", function (done) {
    host.api(API).params({
      id: 1
    }).success(done);
  });

});
