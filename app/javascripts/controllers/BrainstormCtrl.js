staticApp.controller('BrainstormCtrl', ['$scope', '$firebase', '$cookies', '$location', function($scope, $firebase, $cookies, $location) {
  // use random end of URL as room name
  var roomName = $location.path().match(/[^\/]+$/);

  var url = 'https://fiddlesticks.firebaseio.com/brainstorms/' + roomName + '/';
  var ref = new Firebase(url);
  var db = $firebase(ref);

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
    console.log(val);
    $scope.timer.countDownRunning = val;
    console.log($scope.timer.countDownRunning);
  });

  // check if userId is stored cookie
  if($cookies.userId == undefined) {
    $cookies.userId = generateUserId();
    $scope.user = new User($cookies.userId);
  }
  else {
    $scope.user = db.$child('users/' + $cookies.userId);
  }

  $scope.items = db.$child('items');
  $scope.items.$on('loaded', function(value) {
    db.$child('items').$bind($scope, 'items');
  });

  $scope.users = db.$child('users');
  $scope.users.$on('loaded', function(value) {
    // check if user defined in DB
    if(typeof $scope.user.credits == 'undefined') {
      $scope.user = new User($cookies.userId);
    }
    else {
      $scope.user.userId = $cookies.userId;
    }

    db.$child('users/' + $scope.user.userId).$bind($scope, 'user');
    db.$child('users').$bind($scope, 'users');
  });

  $scope.addItem = function() {
    $scope.user.credits++;
    $scope.item = new Item($scope.item.title);
    $scope.items.$add($scope.item);
    $scope.item = '';
  };

  function generateUserId() {
    return 'user' + Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1)
              .toUpperCase();
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
