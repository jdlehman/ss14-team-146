staticApp.controller('BrainstormCtrl', ['$scope', '$firebase', '$cookies', function($scope, $firebase, $cookies) {
  var roomName = 'randomRoom';
  var url = 'https://fiddlesticks.firebaseio.com/brainstorms/' + roomName + '/';
  var ref = new Firebase(url);
  var db = $firebase(ref);

  // check if userId is stored cookie
  if($cookies.userId == undefined) {
    $cookies.userId = 'user' + Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1)
              .toUpperCase();
    $scope.user = new User($cookies.userId);
  }
  else {
    $scope.user = db.$child('users/' + $cookies.userId);
  }

  $scope.items = db.$child('items');
  $scope.items.$on('loaded', function(value) {
    // check if user defined in DB
    if(typeof $scope.user.credits == 'undefined') {
      $scope.user = new User($cookies.userId);
    }
    else {
      $scope.user.userId = $cookies.userId;
    }

    db.$child('items').$bind($scope, 'items');
  });

  $scope.users = db.$child('users');
  $scope.users.$on('loaded', function(value) {
    db.$child('users/' + $scope.user.userId).$bind($scope, 'user');
    db.$child('users').$bind($scope, 'users');
  });

  $scope.addItem = function() {
    $scope.user.credits++;
    $scope.item = new Item($scope.item.title);
    $scope.items.$add($scope.item);
    $scope.item = '';
  };

  function Item(title) {
    this.title = title;
    this.totalCredits = 0;
    this.votes = {};
    this.votes[$scope.user.userId] = 0;
  }

  function User(userId) {
    this.userId = userId;
    this.credits = 0;
  };
}]);
