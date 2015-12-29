angular.module('app')
.controller 'mainBlockControl', [
    '$scope',
    '$stateParams',
    '$state',
    'constantTimes',
    '$rootScope'
    ($scope, $stateParams, $state, constantTimes, $rootScope) ->
      week = null

      $scope.next = ()->
        week++
        $state.go('main.week', {week: week})

      $scope.prev = ()->
        week--
        $state.go('main.week', {week: week})

      $scope.setWeek = (val)->
        week = val

      $scope.times = constantTimes
      return
  ]