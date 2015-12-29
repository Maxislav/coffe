angular.module('app').directive 'cMission', () ->
  {
  restrict: 'A',
  require: '^cDay',
  controller: 'missionControl'
  scope: {
    cMission: '='
    cMissionEdit: '='
  }
  link: (scope, el, attr, cdsy) ->
    from = scope.cMission.from
    to = scope.cMission.to
    perc = null
    setHeighTop = ()->
      el.css('height', (parseInt(to) - parseInt(from)) * 100 / 24 + '%')
      perc = parseFloat(from) * 100 / 24
      el.css('top', Math.round(perc * 100) / 100 + '%')
      null
    setHeighTop()

    #следим за изменением времени в случае редактирования
    scope.$watchCollection (->
      [scope.cMission.from
       scope.cMission.to]
    ), (val, oldVal) ->
      if val[0] != oldVal[0]
        from = val[0]
        setHeighTop()
      if val[1] != oldVal[1]
        to = val[1]
        setHeighTop()
      return

    editMission = (e)->
      scope.$apply(scope.editEvent( cdsy.getDay() ,scope.cMission))

    el.on 'click', editMission
    scope.$on '$destroy', ->
      el.off 'click', editMission
      return

    return
  }