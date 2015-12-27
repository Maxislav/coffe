angular.module('app')
.controller 'mainBlockControl', [
    '$scope',
    '$stateParams',
    '$state',
    'factoryTime',
    '$rootScope'
    ($scope, $stateParams, $state, factoryTime, $rootScope) ->
      week = null

      $scope.next = ()->
        week++
        $state.go('main.week', {week: week})

      $scope.prev = ()->
        week--
        $state.go('main.week', {week: week})

      $scope.setWeek = (val)->
        week = val

      $scope.times = factoryTime.times
      return
  ]