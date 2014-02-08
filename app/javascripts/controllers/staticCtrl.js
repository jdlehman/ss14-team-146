staticApp.controller('StaticCtrl', ['$scope', function($scope) {
  $scope.items = [];
  $scope.item = new Item();
  $scope.user = {};
  $scope.user.credits = 0;

  $scope.addItem = function() {
    $scope.user.credits++;
    $scope.items.push($scope.item);
    $scope.item = new Item();
  };

  function Item() {
    this.title = '';
    this.creditsFromUser = 0;
    this.totalCredits = 0;
  }
}]);
