angular.module('app').controller('weekControl', [
  '$scope', '$stateParams', function($scope, $stateParams) {
    $scope.next = function() {
      return console.log('next');
    };
    return $scope.prev = function() {
      console.log('prev');
      return void 0;
    };
  }
]);
