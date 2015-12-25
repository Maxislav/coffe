angular.module('app')
.controller 'weekControl', [
  '$scope',
  '$stateParams',
  ($scope,
   $stateParams) ->
    $scope.next = ()->
      console.log('next')

    $scope.prev = ()->
      console.log('prev')
      undefined

]