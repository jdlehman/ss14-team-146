staticApp.controller('TimerCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.timeLeft = 60;//seconds
  $scope.countDownRunning = false;

  $scope.startTimer = function() {
    $scope.countDownRunning = true;
    $rootScope.$broadcast('timerStateChange', true);

    var intervalId = setInterval(function(){
      $scope.$apply(function() {
        if($scope.timeLeft > 0) {
          $scope.timeLeft--;
        }
        else {
          clearInterval(intervalId);
          $scope.countDownRunning = false;
          $rootScope.$broadcast('timerStateChange', false);
        }
      });
    }, 1000);
  };

}]);
