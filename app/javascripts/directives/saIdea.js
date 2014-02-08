staticApp.directive('saIdea', [function() {
  return {
    restrict: 'E',
    scope: {
      item: '=',
      userCredits: '=',
      userId: '='
    },
    templateUrl: 'javascripts/templates/saIdea.html',
    link: function(scope, el, attr) {
      scope.addCredit = function() {
        if(scope.userCredits > 0) {
          //scope.item.creditsFromUser++;
          scope.item.totalCredits++;
          scope.userCredits--;
          if (scope.item.votes[scope.userId]==undefined) {
            scope.item.votes[scope.userId] = 1;
          } else {
            scope.item.votes[scope.userId]++;
          }

        }

      };

      scope.removeCredit = function() {
        if(scope.item.votes[scope.userId] > 0) {
          //scope.item.creditsFromUser--;
          scope.item.totalCredits--;
          scope.userCredits++;
          scope.item.votes[scope.userId]--;
        }
      }
    }
  };
}]);
