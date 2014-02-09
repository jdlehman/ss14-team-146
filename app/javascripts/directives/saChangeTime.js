staticApp.directive('saChangeTime', [function() {
  return {
    restrict: 'E',
    scope: {
      seconds: '=',
      timerRunning: '='
    },
    replace: true,
    templateUrl: 'javascripts/templates/saChangeTime.html',
    link: function(scope, el, attr) {
      scope.time = {};
      scope.formHidden = true;
      separateSeconds();

      scope.editTime = function() {
        scope.formHidden = false;
      };

      scope.setTime = function() {
        scope.formHidden = true;
        scope.seconds = calculateSeconds();
      };

      function separateSeconds() {
        var timeRemaining = scope.seconds;
        scope.time.days = Math.floor(timeRemaining / (60 * 60 * 24));
        timeRemaining -= scope.time.days * 24 * 60 * 60;
        scope.time.hours = Math.floor(timeRemaining / (60 * 60));
        timeRemaining -= scope.time.hours * 60 * 60;
        scope.time.minutes = Math.floor(timeRemaining / 60);
      }

      function calculateSeconds() {
        return scope.time.minutes * 60 +
               scope.time.hours * 60 * 60 +
               scope.time.days * 60 * 60 * 24;
      }

    }
  }
}]);
