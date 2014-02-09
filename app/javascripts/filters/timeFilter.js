staticApp.filter('timeFilter', [function() {
  return function(input) {
    //input in seconds
    var timeRemaining = input;
    var hours = Math.floor(timeRemaining / (60 * 60));
    timeRemaining -= hours * 60 * 60;
    var minutes = Math.floor(timeRemaining / 60);
    timeRemaining -= minutes * 60;
    var seconds = timeRemaining;

    function format(val) {
      var displayVal = val.toString();
      return displayVal.length === 1 ? '0' + displayVal : displayVal;
    }

    return [format(hours), format(minutes), format(seconds)].join(':');
  }
}]);
