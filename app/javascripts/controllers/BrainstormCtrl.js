staticApp.controller('BrainstormCtrl', ['$scope', '$cookieStore', '$location', 'firebaseService', '$q', function($scope, $cookieStore, $location, firebaseService, $q) {
  // use random end of URL as room name
  var roomName = $location.path().match(/[^\/]+$/);
  var db = firebaseService.init(roomName);
  $scope.loaded = false;

  // load data from firebase
  $q.all([
    firebaseService.load(db, 'timer'),
    firebaseService.load(db, 'items'),
    firebaseService.load(db, 'users')
  ])
  .then(function(vals) {
    setUpTimer(vals[0]);
    setUpItems(vals[1]);
    setUpUsers(vals[2]);
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

  function setUpTimer(value) {
    $scope.timer = value || {};
  }

  function setUpItems(value) {
    $scope.items = value || {};
    // 3 way binding
    db.$child('items').$bind($scope, 'items');
  }

  function setUpUsers(value) {
    $scope.users = value || {};

    var userName = $cookieStore.get(roomName);
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
  }

}]);
