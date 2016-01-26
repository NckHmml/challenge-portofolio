var app = require("express")(),
    Database = require("./database.js"),
    ProjectController = require("./controllers/ProjectApiController.js");

global.database = new Database();
var projectController = new ProjectController(app);
app.listen(8080);