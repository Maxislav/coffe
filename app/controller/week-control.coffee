angular.module('app')
.controller 'weekControl', [
  '$scope',
  '$stateParams',
  '$state',
  ($scope,
   $stateParams,
   $state) ->
    $scope.next = ()->
      $stateParams.week++
      $state.go('main.week', $stateParams)
      console.log($stateParams)

    $scope.prev = ()->
      console.log('prev')
      undefined

]