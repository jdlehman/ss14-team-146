staticApp.controller('BrainstormCtrl', ['$scope', '$firebase', function($scope, $firebase) {
  var url = 'https://fiddlesticks.firebaseio.com/';
  var ref = new Firebase(url);
  var db = $firebase(ref);

  $scope.items = [];
  $scope.itemsResult = db.$child('items');
  $scope.itemsResult.$on('loaded', function() {
    $scope.user.credits = $scope.itemsResult.$getIndex().length;
    console.log($scope.itemsResult);
    var keys = $scope.itemsResult.$getIndex();
    keys.forEach(function(key, i) {
      console.log(i, $scope.itemsResult[key]); // prints items in order they appear in Firebase
      $scope.items.push(new Item($scope.itemsResult[key].title, $scope.itemsResult[key].creditsFromUser, $scope.itemsResult[key].totalCredits));
    });
  });
  $scope.item = new Item();
  $scope.user = {};

  $scope.addItem = function() {
    $scope.user.credits++;
    // $scope.items.$bind($scope, 'items');
    $scope.items.$add($scope.item);
    $scope.item = new Item();
  };

  function Item(title, creditsFromUser, totalCredits) {
    if (title == undefined) {
      this.title = '';
    } else {
      this.title = title;
    }
    if (creditsFromUser == undefined) {
      this.creditsFromUser = 0;
    } else {
      this.creditsFromUser = creditsFromUser;
    }
    if (totalCredits == undefined) {
      this.totalCredits = 0;
    } else {
      this.totalCredits = totalCredits;
    }
  }
}]);
