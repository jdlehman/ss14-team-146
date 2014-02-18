staticApp.controller('BrainstormCtrl', ['$scope', '$cookieStore', '$location', 'firebaseService', function($scope, $cookieStore, $location, firebaseService) {
  // use random end of URL as room name
  var roomName = $location.path().match(/[^\/]+$/);
  var db = firebaseService.init(roomName);
  $scope.loaded = false;

  // load timer from firebase
  firebaseService.load(db, 'timer').then(function(value) {
    $scope.timer = value;
    if($scope.timer === null) {
      $scope.timer = {};
    }
  });

  // load items from firebase
  firebaseService.load(db, 'items').then(function(value) {
    $scope.items = value;
    if($scope.items === null) {
      $scope.items = {};
    }
    // 3 way binding
    db.$child('items').$bind($scope, 'items');
  });

  var userName;
  // load users from firebase
  firebaseService.load(db, 'users').then(function(value) {
    $scope.users = value;
    if($scope.users === null) {
      $scope.users = {};
    }

    userName = $cookieStore.get(roomName);
    // check if userId is stored cookie
    if(typeof userName === 'undefined') {
      // set cookie
      $cookieStore.put(roomName, generateUserId());
      userName = $cookieStore.get(roomName);

      // add user to users
      $scope.user = new User(userName);
      $scope.users[userName] = $scope.user;
    }
    else {
      $scope.user = $scope.users[userName];
    }
    // 3 way binding
    db.$child('users').$bind($scope, 'users');
    $scope.loaded = true;
  });

  $scope.$on('timerStateChange', function(event, val) {
    $scope.timer.countDownRunning = val;
  });

  // add brainstorm item
  $scope.addItem = function() {
    $scope.user.credits++;
    $scope.user.totalCredits++;
    $scope.item = new Item($scope.item.title);
    db.$child('items').$add($scope.item);
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
    this.totalCredits = 0;
  };
}]);
