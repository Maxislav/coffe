angular.module('app').controller('weekControl', [
  '$scope', '$stateParams', '$state', 'factoryWeek', function($scope, $stateParams, $state, factoryWeek) {
    $scope.week = factoryWeek.getWeek($stateParams.week);
    console.log($scope.week);
  }
]);
