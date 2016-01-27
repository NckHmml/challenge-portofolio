var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    Database = require("./database.js"),
    ProjectController = require("./controllers/ProjectController.js"),
    ProjectApiController = require("./controllers/ProjectApiController.js");

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/public", express.static(__dirname + "/public"));

global.database = new Database();
var projectController = new ProjectController(app);
var projectApiController = new ProjectApiController(app);

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("node started");
});