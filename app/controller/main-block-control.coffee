angular.module('app')
.controller 'mainBlockControl', [
  '$scope',
  '$stateParams',
  '$state',
    'factoryTime',
  ($scope,
   $stateParams,
   $state,
   factoryTime) ->
    $scope.next = ()->
      $stateParams.week++
      $state.go('main.week', $stateParams)

    $scope.prev = ()->
      $stateParams.week--
      $state.go('main.week', $stateParams)


    $scope.times = factoryTime.times
    return


]