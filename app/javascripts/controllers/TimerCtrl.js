staticApp.controller('TimerCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.timer = {};
  $scope.timer.timeLeft = 600;//seconds
  $scope.timer.countDownRunning = false;

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
