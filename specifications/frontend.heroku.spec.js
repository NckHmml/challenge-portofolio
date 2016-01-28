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
        scripts: ["https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.9/angular-mocks.js"],
        features: {
            FetchExternalResources: ["script"],
            ProcessExternalResources: ["script"]
        },
        created: function (errors, window) {
            // Polyfills
            window.console.log = console.log;
            window.addEventListener("error", function (event) {
                console.error("script error:", event.error);
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
    var $httpBackend, $controller, $rootScope;

    beforeEach(function () {
        global.window.module("portofolioApp");
        global.window.inject(function ($injector) {
            $controller = $injector.get("$controller");
            $httpBackend = $injector.get("$httpBackend");
            $rootScope = $injector.get("$rootScope");
            $httpBackend.when("GET", "/api/projects").respond([]);
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("expect API to be called", function () {
        $httpBackend.expect("GET", "/api/projects");
        var controller = $controller("MainController", { "$scope": $rootScope });
        $httpBackend.flush();
    });
});