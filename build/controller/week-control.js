angular.module('app').controller('weekControl', [
  '$scope', '$stateParams', '$state', 'factoryWeek', function($scope, $stateParams, $state, factoryWeek) {
    $scope.setWeek($stateParams.week);
    $scope.week = factoryWeek.getWeek($stateParams.week);
  }
]);
