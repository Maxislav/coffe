angular.module('app').directive 'cMission', (serviceDialog) ->
  {
  restrict: 'A',
  link: (scope, el, attr) ->

    from = scope[attr.cMission].from
    perc = parseFloat(from)*100/24

    console.log Math.round(perc*100)/100

    el.css('top', Math.round(perc*100)/100 + '%' )

    return
  }