staticApp.controller('MainCtrl', ['$scope', function($scope) {

  $scope.generateBrainstormLink = function() {
    return '#/brainstorm/' + $scope.random.toString();
  };

  $scope.generateRandomStr = function(times) {
    var str = "";
    for(var i = 0; i < times; i++) {
      str += Math.random().toString(36).substring(2);
    }
    return str;
  };

  $scope.random = $scope.generateRandomStr(4);
}]);
