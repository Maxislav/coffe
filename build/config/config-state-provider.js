angular.module('app').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise(function($injector, $location) {
    return '/week';
  });
  $stateProvider.state("main", {
    url: "/main",
    templateUrl: 'build/templates/ui-view-main.html',
    controller: function($scope) {}
  }).state('main.week', {
    url: '/week/:week',
    views: {
      main: {
        templateUrl: 'build/templates/week.html',
        controller: 'weekControl'
      }
    }
  });
  return null;
});
