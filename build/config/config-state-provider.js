angular.module('app').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise(function($injector, $location) {
    return 'main/0/week';
  });
  $stateProvider.state("main", {
    url: "/main/:week",
    templateUrl: 'build/templates/main-block.html',
    controller: 'mainBlockControl'
  }).state('main.week', {
    url: '/week',
    views: {
      main: {
        templateUrl: 'build/templates/week.html',
        controller: 'weekControl'
      }
    }
  });
  return null;
});
