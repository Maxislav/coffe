angular.module('app').directive 'cMission', (factoryLocalStorage, serviceDialog) ->
  {
  restrict: 'A',
  require: '^cDay'
  link: (scope, el, attr, cdsy) ->
    from = scope[attr.cMission].from
    to  = scope[attr.cMission].to
    perc = null
    setTop = (val)->
      perc = parseFloat(val || from)*100/24
      el.css('top', Math.round(perc*100)/100 + '%' )
    setTop()

    setHeight = (val) ->
      console.log((parseInt(val || to ) - parseInt(from))*100/24)
      el.css('height', (parseInt(val || to ) - parseInt(from))*100/24 + '%')
      null
    setHeight()


    mission = scope[attr.cMission]

    scope.$watchCollection (->
      [scope[attr.cMission].from
      scope[attr.cMission].to]
    ), (val, oldVal) ->
      if val[0]!=oldVal[0]
        setTop(val)
      if val[1]!=oldVal[1]
        setHeight(val[1])

    update = (m1, m2)->
      for opt of m2
        m1[opt] = m2[opt]

    getMission = (mission)->
      missions = factoryLocalStorage.getMissions()[mission.dayDate].times
      i = 0
      while i<missions.length
        if missions[i] == mission
          return missions[i]
        i++
      null

    save = (obj)->
      update(getMission(mission), obj)
      factoryLocalStorage.setStorage(cdsy.getDay())
      return

    _remove = ()->
      missions = factoryLocalStorage.getMissions()[mission.dayDate].times
      i = 0
      while i<missions.length
        if missions[i] == mission
           missions.splice(i, 1)
           break
        i++
      factoryLocalStorage.setStorage(cdsy.getDay())
      null


    dialogShow = ()->
      content = angular.copy(scope[attr.cMission])
      serviceDialog.add
        templateUrl: 'build/templates/dialog/dialog-base.html'
        title: 'Edit event'
        content: content
        buttons: [
          {
            class: 'primary'
            text: 'Apply'
            disabled: 'missionForm.$invalid'
            action: ( )->
              save
                title: this.content.title
                description: this.content.description
                from: this.content.from
                to: this.content.to

              return
          }
          {
            text: 'Delete'
            action: ()->
              _remove()

          }
          {text: 'Cancel'}
        ]
      scope.$apply();
      # console.log serviceDialog
      return


    el.on 'click', dialogShow
    scope.$on '$destroy', ->
      el.off 'click', dialogShow
      return

    return
  }