staticApp.directive('saIdea', [function() {
  return {
    restrict: 'E',
    scope: {
      item: '=',
      user: '='
    },
    templateUrl: 'javascripts/templates/saIdea.html',
    link: function(scope, el, attr) {
      scope.addCredit = function() {
        if(scope.user.credits > 0) {
          var currVal = scope.item.votes[scope.user.userId] || 0;
          scope.item.votes[scope.user.userId] = currVal + 1;
          scope.item.totalCredits++;
          scope.user.credits--;
        }
      };

      scope.removeCredit = function() {
        if(scope.item.votes[scope.user.userId]) {
          scope.item.votes[scope.user.userId]--;
          scope.item.totalCredits--;
          scope.user.credits++;
        }
      }
    }
  };
}]);
