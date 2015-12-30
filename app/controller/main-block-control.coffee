angular.module('app')
.controller 'mainBlockControl', [
    '$scope',
    '$stateParams',
    '$state',
    'constantTimes',
    '$rootScope'
    ($scope, $stateParams, $state, constantTimes, $rootScope) ->
      week = null
      $scope.year = null;

      setYear = (n)->
        d = new Date();
        $scope.year = new Date(d.getFullYear(), d.getMonth(), d.getDate()+(n*7)).getFullYear()

      $scope.next = ()->
        week++
        $state.go('main.week', {week: week})

      $scope.prev = ()->
        week--
        $state.go('main.week', {week: week})

      $scope.setWeek = (val)->
        week = val
        setYear(val)

      $scope.times = constantTimes
      return
  ]