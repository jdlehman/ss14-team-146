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
      scope.formHidden = true;

      scope.editTime = function() {
        separateSeconds();
        scope.formHidden = false;
      };

      scope.setTime = function() {
        scope.hideForm();
        scope.seconds = calculateSeconds();
      };

      scope.hideForm = function() {
        scope.formHidden = true;
      };

      function separateSeconds() {
        var timeRemaining = scope.seconds;
        scope.timeForm.hours = Math.floor(timeRemaining / (60 * 60));
        timeRemaining -= scope.timeForm.hours * 60 * 60;
        scope.timeForm.minutes = Math.floor(timeRemaining / 60);
      }

      function calculateSeconds() {
        return scope.timeForm.minutes * 60 +
               scope.timeForm.hours * 60 * 60;
      }

    }
  }
}]);
