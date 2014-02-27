staticApp.controller('BrainstormCtrl', ['$scope', '$cookieStore', '$routeParams', 'firebaseService', '$q', function($scope, $cookieStore, $routeParams, firebaseService, $q) {
  // use random end of URL as room name
  var roomName = $routeParams.id;
  var db = firebaseService.init(roomName);
  $scope.loaded = false;
  $scope.timer = {};
  $scope.items = {};
  $scope.users = {};
  $scope.user = {};

  $q.all([
    db.$child('timer').$bind($scope, 'timer'),
    db.$child('items').$bind($scope, 'items'),
    db.$child('users').$bind($scope, 'users'),
  ]).then(function(vals) {
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
