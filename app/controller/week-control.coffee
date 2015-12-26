angular.module('app')
.controller 'weekControl', [
  '$scope',
  '$stateParams',
  '$state',
  ($scope,
   $stateParams,
   $state) ->
    $scope.week = $stateParams.week
    console.log($stateParams.week)

]