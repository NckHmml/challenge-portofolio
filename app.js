var app = require("express")(),
    Database = require("./database.js"),
    ProjectController = require("./controllers/ProjectApiController.js");

global.database = new Database();
var projectController = new ProjectController(app);

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("node started");
});