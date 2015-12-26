angular.module('app').directive 'cMission', (factoryLocalStorage) ->
  {
  restrict: 'A',
  require: '?^cDay'
  link: (scope, el, attr, cdsy) ->

    from = scope[attr.cMission].from
    perc = parseFloat(from)*100/24

    #console.log Math.round(perc*100)/100

    el.css('top', Math.round(perc*100)/100 + '%' )

   # console.log cdsy.getDate()

    return
  }