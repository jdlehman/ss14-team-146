staticApp.directive('saTimer', [function() {
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'javascripts/templates/saTimer.html'
  }
}]);
