staticApp.filter('timeFilter', [function() {
  return function(input) {
    //input in seconds
    var timeRemaining = input;
    var days = Math.floor(timeRemaining / (60 * 60 * 24));
    timeRemaining -= days * 24 * 60 * 60;
    var hours = Math.floor(timeRemaining / (60 * 60));
    timeRemaining -= hours * 60 * 60;
    var minutes = Math.floor(timeRemaining / 60);
    timeRemaining -= minutes * 60;
    var seconds = timeRemaining;

    function format(val, str) {
      if(val > 0) {
        return  val + str + ((val !== 1) ? 's' : '') + ' ';
      }
      else {
        return '';
      }
    }

    if(input === 0) {
      return '0 seconds';
    }
    else {
      return format(days, ' day') +
             format(hours, ' hour') +
             format(minutes, ' minute') +
             format(seconds, ' second');
    }

  }
}]);
