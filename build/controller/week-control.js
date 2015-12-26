angular.module('app').controller('weekControl', [
  '$scope', '$stateParams', '$state', function($scope, $stateParams, $state) {
    $scope.week = $stateParams.week;
    return console.log($stateParams.week);
  }
]);
