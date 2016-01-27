var app = angular.module("portofolioApp", []);

app.factory("projects", ["$http", function ($http) {
    console.log("HELLO");
    return $http.get("/api/projects")
      .success(function (data) {
          return data;
      })
      .error(function (err) {
          return err;
      });
}]);

app.controller("MainController", ["$scope", "projects", function ($scope, projects) {
    projects.success(function (data) {        
        $scope.projects = data;
        $scope.remove = function (project) {
            console.log(project);
            $scope.projects.pop(project);
        }
    });
}]);

app.directive("myPortofolio", function () {
    return {
        restrict: "E",
        templateUrl: "/template/portofolio"
    };
});