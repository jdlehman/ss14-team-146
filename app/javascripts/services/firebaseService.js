staticApp.factory('firebaseService', ['$q', '$firebase', function($q, $firebase) {
  var baseUrl = 'https://fiddlesticks.firebaseio.com/brainstorms/';

  return {
    init: function(roomName) {
      return $firebase(new Firebase(baseUrl + roomName + '/'));
    },
    load: function(db, childName) {
      var deferred = $q.defer();
      var data = db.$child(childName);
      data.$on('loaded', function(value) {
        deferred.resolve(value);
      });
      return deferred.promise;
    }
  };
}]);
