staticApp.controller('BrainstormCtrl', ['$scope', '$firebase', function($scope, $firebase) {
  var url = 'https://fiery-fire-7756.firebaseio.com/';
  var ref = new Firebase(url);
  var db = $firebase(ref);

  $scope.userId = '123paulo';

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
    this.totalCredits = 0;
    this.votes = {}
    this.votes[$scope.userId] = 0;
  }
}]);
