var sqlite3 = require("sqlite3").verbose(),
    db = new sqlite3.Database(":memory:"),
    fs = require("fs");

var Database = function () {
    fs.readFile("./specifications/database.sql", "utf8", function (err, data) {
        db.run(data);
    });

    this.GetProjects = function (callback) {
        db.all("SELECT * FROM projects;", function (err, rows) {
            callback(rows);
        });
    };

    this.GetProject = function (id, callback) {
        db.get("SELECT * FROM projects WHERE id=?", id, function (err, row) {
            callback(row);
        });
    };

    this.AddProject = function (project) {
        db.run("INSERT INTO projects (url, title, description) VALUES ($url, $title, $description)", {
            $url: project.url,
            $title: project.title,
            $description: project.description
        });
    };

    this.DeleteProject = function (id, callback) {
        db.run("DELETE FROM projects WHERE id=?", id, function () {
            callback(this);
        });
    };
};

module.exports = Database;