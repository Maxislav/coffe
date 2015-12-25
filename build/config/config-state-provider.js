angular.module('app').config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise(function($injector, $location) {
    return '/week';
  });
  $stateProvider.state("olol", {
    url: "/olol",
    template: '<div class="week"></div>',
    controller: function($scope) {}
  }).state('week', {
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
