var staticApp = angular.module('staticApp', ['ngRoute', 'firebase', 'ngCookies'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/brainstorm/:id', {
        templateUrl: 'views/brainstorm.html'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);

