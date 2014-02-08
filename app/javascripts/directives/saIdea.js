staticApp.directive('saIdea', [function() {
  return {
    restrict: 'E',
    scope: {
      item: '=',
      userCredits: '='
    },
    templateUrl: 'javascripts/templates/saIdea.html',
    link: function(scope, el, attr) {
      scope.addCredit = function() {
        if(scope.userCredits > 0) {
          scope.item.creditsFromUser++;
          scope.item.totalCredits++;
          scope.userCredits--;
        }
      };

      scope.removeCredit = function() {
        if(scope.item.creditsFromUser > 0) {
          scope.item.creditsFromUser--;
          scope.item.totalCredits--;
          scope.userCredits++;
        }
      }
    }
  };
}]);
