staticApp.controller('BrainstormCtrl', ['$scope', '$firebase', function($scope, $firebase) {
  var roomName = 'randomRoom';
  var url = 'https://fiddlesticks.firebaseio.com/brainstorms/' + roomName + '/';
  var ref = new Firebase(url);
  var db = $firebase(ref);

  $scope.user = new User('123user');
  $scope.item = new Item();

  $scope.items = db.$child('items');
  $scope.users = db.$child('users');

  $scope.items.$on('loaded', function(value) {
    $scope.user.credits = $scope.items.$getIndex().length;
    db.$child('items').$bind($scope, 'items');
  });

  $scope.users.$on('loaded', function(value) {
    $scope.user.credits = $scope.user.credits || $scope.items.$getIndex().length;
    db.$child('users/' + $scope.user.userId).$bind($scope, 'user');
    db.$child('users').$bind($scope, 'users');
  });

  $scope.addItem = function() {
    $scope.user.credits++;
    $scope.items.$add($scope.item);
    $scope.item = new Item();
  };

  function Item() {
    this.title = '';
    this.totalCredits = 0;
    this.votes = {};
    this.votes[$scope.user.userId] = 0;
  }

  function User(userId) {
    this.userId = userId;
  };
}]);
