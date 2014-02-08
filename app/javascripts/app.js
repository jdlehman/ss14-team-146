var staticApp = angular.module('staticApp', ['ngRoute', 'firebase'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/brainstorm/:id', {
        templateUrl: 'views/brainstorm.html'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

