staticApp.controller('TimerCtrl', ['$scope', '$rootScope', '$firebase', '$location', function($scope, $rootScope, $firebase, $location) {
  // use random end of URL as room name
  var roomName = $location.path().match(/[^\/]+$/);

  var url = 'https://fiddlesticks.firebaseio.com/brainstorms/' + roomName + '/';
  var ref = new Firebase(url);
  var db = $firebase(ref);

  $scope.loaded = false;
  db.$on('loaded', function(value) {
    $scope.loaded = true;
  });

  $scope.timer = db.$child('timer');
  $scope.timer.$on('loaded', function(value) {
    db.$child('timer').$bind($scope, 'timer');
    if(typeof $scope.timer.timeLeft === 'undefined') {
      //default to 10 minutes
      $scope.timer.timeLeft = 600;//seconds
      $scope.timer.countDownRunning = false;
    }
    else {
      //start timer if already running
      if($scope.timer.countDownRunning) {
        $scope.startTimer();
      }
    }
  });

  $scope.startTimer = function() {
    $scope.timer.countDownRunning = true;
    $rootScope.$broadcast('timerStateChange', true);

    var intervalId = setInterval(function(){
      $scope.$apply(function() {
        if($scope.timer.timeLeft > 0) {
          $scope.timer.timeLeft--;
        }
        else {
          clearInterval(intervalId);
          $scope.timer.countDownRunning = false;
          $rootScope.$broadcast('timerStateChange', false);
        }
      });
    }, 1000);
  };

}]);
