var ProjectController = function (app) {
    app.get("/", function (req, res) {
        res.render("index");
    });
    app.get("/template/portofolio", function (req, res) {
        res.render("portofolio.template.html");
    });
};

module.exports = ProjectController;