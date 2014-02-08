staticApp.controller('BrainstormCtrl', ['$scope', '$firebase', function($scope, $firebase) {
  var url = 'https://fiddlesticks.firebaseio.com/';
  var ref = new Firebase(url);
  var db = $firebase(ref);

  $scope.user = new User('123nochael');
  $scope.item = new Item();

  $scope.items = db.$child('items');
  $scope.users = db.$child('users');

  $scope.items.$on('loaded', function(value) {
    db.$child('items').$bind($scope, 'items');
  });

  $scope.users.$on('loaded', function(value) {
    // get cookie and set here
    $scope.users.$add($scope.user);
    $scope.user.credits = $scope.user.credits || $scope.items.$getIndex().length;
    db.$child('users').$bind($scope, 'users');
  });

  $scope.addItem = function() {
    $scope.user.credits++;
    $scope.items.$add($scope.item);
    $scope.item = new Item();
  };

  function Item() {
    this.title = '';
    this.votes = { placeHolder: 0 };
    this.totalCredits = 0;
  }

  function User(userId) {
    this.userId = userId;
  };
}]);
