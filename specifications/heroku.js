'use strict';

var
  request = require('request');

function origin (appname) {
    return appname + '.herokuapp.com';
    //return "localhost:8080"
}

module.exports = {
  origin: origin
}
