staticApp.controller('BrainstormCtrl', ['$scope', '$firebase', '$cookieStore', '$location', 'firebaseService', function($scope, $firebase, $cookieStore, $location, firebaseService) {
  // use random end of URL as room name
  var roomName = $location.path().match(/[^\/]+$/);
  var db = firebaseService.init(roomName);
  $scope.loaded = false;

  // load timer from firebase
  firebaseService.load(db, 'timer').then(function(value) {
    $scope.loaded = true;
    $scope.timer = value;
    if(typeof $scope.timer.countDownRunning === 'undefined') {
      $scope.timer.countDownRunning = false;
    }
  });

  // load items from firebase
  firebaseService.load(db, 'items').then(function(value) {
    // 3 way binding
    $scope.items = value;
    //TODO: fix this hack
    // once you set value to something, you can no longer use it to bind
    firebaseService.load(db, 'items').then(function(value) { value.$bind($scope, 'items'); });
  });

  // load users from firebase
  firebaseService.load(db, 'users').then(function(value) {
    // 3 way binding
    $scope.users = value.$bind($scope, 'users');
    // check if userId is stored cookie
    if(typeof $cookieStore.get(roomName) === 'undefined') {
      // set cookie
      $cookieStore.put(roomName, generateUserId());
      // add user to users
      $scope.user = new User($cookieStore.get(roomName));
      $scope.users[$cookieStore.get(roomName)] = $scope.user;
    }
    return firebaseService.load(db, 'users/' + $cookieStore.get(roomName));
  }).then(function(value) {
    $scope.user = value.$bind($scope, 'user');
  });

  $scope.$on('timerStateChange', function(event, val) {
    $scope.timer.countDownRunning = val;
  });

  // add brainstorm item
  $scope.addItem = function() {
    $scope.user.credits++;
    $scope.user.totalCredits++;
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
    this.totalCredits = 0;
  };
}]);
