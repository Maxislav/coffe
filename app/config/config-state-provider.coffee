angular.module('app')
.config ( $stateProvider, $urlRouterProvider ) ->


    $urlRouterProvider
    .otherwise( ($injector, $location) ->
           '/week'
    );

    $stateProvider
    .state( "olol", {
          url: "/olol",
          template: '<div class="week"></div>',
          controller: ($scope)->
        } )
    .state('week', {
          url: '/week/:week',
          views: {
            main: {
              templateUrl: 'build/templates/week.html',
              controller: 'weekControl'
            }
          }
        });
    null