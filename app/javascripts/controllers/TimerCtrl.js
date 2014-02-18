staticApp.controller('TimerCtrl', ['$scope', '$rootScope', 'firebaseService', '$location', '$timeout', function($scope, $rootScope, firebaseService, $location, $timeout) {
  // use random end of URL as room name
  var roomName = $location.path().match(/[^\/]+$/);
  var db = firebaseService.init(roomName);
  $scope.loaded = false;

  firebaseService.load(db, 'timer').then(function(value) {

    $scope.timer = value;
    if($scope.timer === null) {
      //default to 10 minutes
      $scope.timer = {
        timeLeft: 600, //seconds
        countDownRunning: false
      };
    }
    else {
      //start timer if not already running
      if($scope.timer.countDownRunning) {
        var currentTime = $scope.timer.timeLeft;
        $timeout(function() {
          if(currentTime === $scope.timer.timeLeft) {
            $scope.startTimer();
          }
        }, 2000);
      }
    }
    // 3 way binding
    db.$child('timer').$bind($scope, 'timer');
    $scope.loaded = true;
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
