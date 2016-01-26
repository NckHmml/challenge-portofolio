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
};

module.exports = Database;