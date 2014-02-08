staticApp.directive('saIdea', [function() {
  return {
    restrict: 'E',
    scope: {
      item: '=',
      user: '='
    },
    templateUrl: 'javascripts/templates/saIdea.html',
    replace: true,
    link: function(scope, el, attr) {
      scope.addCredit = function() {
        if(scope.user.credits > 0) {
          scope.item.totalCredits++;
          scope.user.credits--;
            var curVal = scope.item.votes[scope.user.userId] || 0;
            scope.item.votes[scope.user.userId] = curVal + 1;
        }
      };

      scope.removeCredit = function() {
        if(scope.item.votes[scope.user.userId] > 0) {
          scope.item.totalCredits--;
          scope.user.credits++;
          scope.item.votes[scope.user.userId]--;
        }
      }
    }
  };
}]);
