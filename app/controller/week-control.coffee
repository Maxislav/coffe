angular.module('app')
.controller 'weekControl', [
  '$scope',
  '$stateParams',
  '$state',
  'factoryWeek',
  ($scope,
   $stateParams,
   $state,
   factoryWeek) ->

    $scope.setWeek($stateParams.week)

    $scope.week = factoryWeek.getWeek($stateParams.week)

    #console.log $scope.week
    return

]