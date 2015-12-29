angular.module('app').directive 'cDay', () ->
  {
  restrict: 'A'
  scope: {
    cDay: '=',
    cDayCreate: '='
  }
  controller: 'dayControl'
  link: (scope, el, attr) ->

    #проверяем ли мы не нажали на уже созданное событие
    ifNeeded = (target)->
      k=false
      a = (_el)->
        if _el.parentNode and _el != el[0]
          if !angular.element(_el).hasClass('time-in-day')
            a(_el.parentNode)

        else if _el == el[0]
          k = true
      a(target)
      k

    createMission = (e)->
      if !ifNeeded(e.target)
        return
      #ображаемся к запуску диалога на создание события
      scope.$apply(scope.createEvent(scope.cDay))

    el.on 'click', createMission
    scope.$on '$destroy', ->
      el.off 'click', createMission
      return
    return
  }