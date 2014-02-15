staticApp.factory('firebaseService', ['$q', '$firebase', function($q, $firebase) {
  var baseUrl = 'https://fiddlesticks.firebaseio.com/brainstorms/';

  return {
    init: function(roomName) {
      return $firebase(new Firebase(baseUrl + roomName + '/'));
    },
    load: function(db, childName) {
      var promise = $q.when(db.$child(childName));
      return promise;
    }
  };
}]);
