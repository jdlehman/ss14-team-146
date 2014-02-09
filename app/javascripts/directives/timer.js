staticApp.directive('saTimer', [function() {
  return {
    restrict: 'E',
    template: '<div><strong>Time Left:</strong> {{timeLeft | timeFilter}}</div>'
  }
}]);
