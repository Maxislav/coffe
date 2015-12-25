angular.module('app')
.config ( $stateProvider, $urlRouterProvider ) ->


    $urlRouterProvider
    .otherwise( ($injector, $location) ->
           'main/week/0'
    );

    $stateProvider
    .state( "main", {
          url: "/main",
          templateUrl: 'build/templates/ui-view-main.html',
          controller: ($scope)->
        } )
    .state('main.week', {
          url: '/week/:week',
          views: {
            main: {
              templateUrl: 'build/templates/week.html',
              controller: 'weekControl'
            }
          }
        });
    null