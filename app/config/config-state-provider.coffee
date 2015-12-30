angular.module('app')
.config ( $stateProvider, $urlRouterProvider, $locationProvider ) ->

    #$locationProvider.html5Mode(true)
    #$locationProvider.hashPrefix('!')
    $urlRouterProvider
    .otherwise( 'main/0' );

    $stateProvider
    .state( "main", {
          url: "/main",
          templateUrl: 'build/templates/main-block.html',
          controller: 'mainBlockControl'
        } )
    .state('main.week', {
          url: '/:week',
          views: {
            main: {
              templateUrl: 'build/templates/week.html',
              controller: 'weekControl'
            }
          }
        });
    null