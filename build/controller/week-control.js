angular.module('app').controller('weekControl', [
  '$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    $scope.next = function() {
      $stateParams.week++;
      $state.go('main.week', $stateParams);
      return console.log($stateParams);
    };
    return $scope.prev = function() {
      console.log('prev');
      return void 0;
    };
  }
]);
