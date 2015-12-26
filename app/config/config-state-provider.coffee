angular.module('app')
.config ( $stateProvider, $urlRouterProvider ) ->


    $urlRouterProvider
    .otherwise( ($injector, $location) ->
           'main/0/week'
    );

    $stateProvider
    .state( "main", {
          url: "/main/:week",
          templateUrl: 'build/templates/main-block.html',
          controller: 'mainBlockControl'
        } )
    .state('main.week', {
          url: '/week',
          views: {
            main: {
              templateUrl: 'build/templates/week.html',
              controller: 'weekControl'
            }
          }
        });
    null