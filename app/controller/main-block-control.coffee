angular.module('app')
.controller 'mainBlockControl', [
  '$scope',
  '$stateParams',
  '$state',
  ($scope,
   $stateParams,
   $state) ->
    $scope.next = ()->
      $stateParams.week++
      $state.go('main.week', $stateParams)

    $scope.prev = ()->
      $stateParams.week--
      $state.go('main.week', $stateParams)
      undefined

]