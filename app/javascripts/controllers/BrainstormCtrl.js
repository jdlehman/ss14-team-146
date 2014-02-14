staticApp.controller('BrainstormCtrl', ['$scope', '$firebase', '$cookies', '$location', function($scope, $firebase, $cookies, $location) {
  // use random end of URL as room name
  var roomName = $location.path().match(/[^\/]+$/);

  var url = 'https://fiddlesticks.firebaseio.com/brainstorms/' + roomName + '/';
  var ref = new Firebase(url);
  var db = $firebase(ref);

  // check if firebase has connected
  $scope.loaded = false;
  db.$on('loaded', function(value) {
    $scope.loaded = true;

    // check if countDownRunning is running/already set
    // if not, set to false
    $scope.timer = db.$child('timer');
    $scope.timer.$on('loaded', function(value) {
      if(typeof $scope.timer.countDownRunning === 'undefined') {
        $scope.timer.countDownRunning = false;
      }
    });
  });

  $scope.$on('timerStateChange', function(event, val) {
    $scope.timer.countDownRunning = val;
  });

  // load and bind items from firebase
  $scope.items = db.$child('items');
  $scope.items.$on('loaded', function(value) {
    db.$child('items').$bind($scope, 'items');
  });

  // load and bind users and user from firebase
  $scope.users = db.$child('users');
  $scope.users.$on('loaded', function(value) {
    // check if userId is stored cookie
    if(typeof $cookies.userId === 'undefined') {
      $cookies.userId = generateUserId();
      $scope.user = new User($cookies.userId);
    }
    else {
      $scope.user = db.$child('users/' + $cookies.userId);
    }

    // check if user defined in DB
    if(typeof $scope.user.credits === 'undefined') {
      $scope.user = new User($cookies.userId);
    }
    else {
      $scope.user.userId = $cookies.userId;
    }

    db.$child('users/' + $scope.user.userId).$bind($scope, 'user');
    db.$child('users').$bind($scope, 'users');
  });

  // add brainstorm item
  $scope.addItem = function() {
    $scope.user.credits++;
    $scope.item = new Item($scope.item.title);
    $scope.items.$add($scope.item);
    $scope.item = '';
  };

  function generateUserId() {
    return 'user' + Math.random().toString(36).substring(2);
  }

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
