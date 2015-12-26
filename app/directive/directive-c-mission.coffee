angular.module('app').directive 'cMission', (serviceDialog) ->
  {
  restrict: 'A',
  link: (scope, el, attr) ->
    console.log(scope[attr.cMission])

    return
  }