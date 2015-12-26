angular.module('app').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise(function($injector, $location) {
    return 'main/week/0';
  });
  $stateProvider.state("main", {
    url: "/main",
    templateUrl: 'build/templates/main-block.html',
    controller: 'mainBlockControl'
  }).state('main.week', {
    url: '/:week',
    views: {
      main: {
        templateUrl: 'build/templates/week.html',
        controller: 'weekControl'
      }
    }
  });
  return null;
});
