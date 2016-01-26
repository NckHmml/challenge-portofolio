var app = require("express")(),
    bodyParser = require("body-parser"),
    Database = require("./database.js"),
    ProjectController = require("./controllers/ProjectApiController.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

global.database = new Database();
var projectController = new ProjectController(app);

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("node started");
});