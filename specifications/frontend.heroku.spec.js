var
    assert = require("chai").assert,
    fs = require("fs"),
    jsdom = require("jsdom"),
    heroku = require("./heroku"),
    appname = require("../account.json").heroku_appname;

before(function (done) {
    this.timeout(1e4); // 10s
    jsdom.env({
        url: "http://" + heroku.origin(appname),
        scripts: ["https://code.angularjs.org/1.3.15/angular-mocks.js"],
        features: {
            FetchExternalResources: ["script"],
            ProcessExternalResources: ["script"]
        },
        created: function (errors, window) {
            window.console.log = console.log;
            window.addEventListener("error", function (event) {
                console.error("script error!!", event.error);
            });
            window.mocha = true;
            window.beforeEach = beforeEach;
            window.afterEach = afterEach;
        },
        done: function (errors, window) {
            global.window = window;
            done();
        }
    });
});

describe("MainController.$scope", function () {
    var $controller;

    beforeEach(function () {
        global.window.module("portofolioApp");
        global.window.inject(function (_$controller_) {
            $controller = _$controller_;
        });
    });

    it("must have projects", function () {
        var $scope = {};
        var controller = $controller("MainController", { $scope: $scope });
        console.log($scope);
    });
});