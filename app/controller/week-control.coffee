angular.module('app')
.controller 'weekControl', [
  '$scope',
  '$stateParams',
  'factoryWeek',
  ($scope,
   $stateParams,
   factoryWeek) ->
    $scope.setWeek($stateParams.week)
    $scope.week = factoryWeek.getWeek($stateParams.week)
    return
]