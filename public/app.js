var app = angular.module("portofolioApp", []);

app.factory("projects", ["$http", function ($http) {
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
    });
    $scope.remove = function (project) {
        var i = $scope.projects.indexOf(project);
        $scope.projects.splice(i, 1);
    }
}]);

app.directive("myPortofolio", function () {
    return {
        restrict: "E",
        templateUrl: "/template/portofolio"
    };
});