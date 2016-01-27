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
    var id = req.params.id;
    if (!id)
        return res.sendStatus(400);
    global.database.GetProject(id, function (data) {
        if (!data)
            return res.sendStatus(404);
        return res.json(data);
    });
};

var AddProject = function add_project(req, res) {
    var project = req.body;
    if (!project.title || !project.url || !project.description)
        return res.sendStatus(400);
    global.database.AddProject(project);
    res.json([]);
};

var DeleteProject = function delete_project(req, res) {
    var id = req.params.id;
    if (!id)
        return res.sendStatus(400);

    global.database.DeleteProject(id, function (result) {
        if (result.changes == 0)
            return res.sendStatus(404);
        res.json([]);
    });
};

module.exports = ProjectApiController;