angular.module('app').controller('mainBlockControl', [
  '$scope', '$stateParams', '$state', 'constantTimes', '$rootScope', function($scope, $stateParams, $state, constantTimes, $rootScope) {
    var week;
    week = null;
    $scope.next = function() {
      week++;
      return $state.go('main.week', {
        week: week
      });
    };
    $scope.prev = function() {
      week--;
      return $state.go('main.week', {
        week: week
      });
    };
    $scope.setWeek = function(val) {
      return week = val;
    };
    $scope.times = constantTimes;
  }
]);
