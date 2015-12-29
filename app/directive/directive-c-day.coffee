angular.module('app').directive 'cDay', (serviceDialog, factoryLocalStorage, $filter) ->
  {
  restrict: 'A'
  scope: {
    cDay: '=',
    cDayCreate: '='
  }
  controller: ($scope) ->
    this.getDate = ()->
      $scope.cDay.date
    this.getDay = ()->
      $scope.cDay
    this
  link: (scope, el, attr) ->

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
      scope.$apply(scope.cDayCreate(scope.cDay))

    el.on 'click', createMission
    scope.$on '$destroy', ->
      el.off 'click', createMission
      return
    return

  }