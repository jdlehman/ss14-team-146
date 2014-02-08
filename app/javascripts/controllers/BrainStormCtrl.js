staticApp.controller('BrainstormCtrl', ['$scope', '$firebase', function($scope, $firebase) {
  var url = 'https://fiddlesticks.firebaseio.com/';
  var ref = new Firebase(url);
  var db = $firebase(ref);

  $scope.items = db.$child('items');
  $scope.items.$on('loaded', function(value) {
    $scope.user.credits = $scope.items.$getIndex().length;
    db.$child('items').$bind($scope, 'items');
  });
  $scope.item = new Item();
  $scope.user = {};

  $scope.addItem = function() {
    $scope.user.credits++;
    $scope.items.$add($scope.item);
    $scope.item = new Item();
  };

  function Item() {
    this.title = '';
    this.creditsFromUser = 0;
    this.totalCredits = 0;
  }
}]);
