var ProjectApiController = function (app) {
    app.get("/api/projects", GetProjects);
    app.get("/api/projects/:id", GetProject);
    app.post("/api/projects", AddProject);
    app.delete("/api/projects/:id", DeleteProject);
};

var GetProjects = function get_projects(req, res) {
    global.database.GetProjects(function (data) {
        res.send(data);
    });
};

var GetProject = function get_project(req, res) {

};

var AddProject = function add_project(req, res) {

};

var DeleteProject = function delete_project(req, res) {

};

module.exports = ProjectApiController;