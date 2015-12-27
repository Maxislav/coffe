angular.module('app').directive 'cMission', (factoryLocalStorage, serviceDialog) ->
  {
  restrict: 'A',
  require: '^cDay'
  link: (scope, el, attr, cdsy) ->
    from = scope[attr.cMission].from
    perc = null
    setTop = (val)->
      perc = parseFloat(val || from)*100/24
      el.css('top', Math.round(perc*100)/100 + '%' )
    setTop()

    mission = scope[attr.cMission]

    scope.$watch (->
      scope[attr.cMission].from
    ), (val, oldVal) ->
      if val!=oldVal
        setTop(val)

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
        title: 'Редактировать событие'
        content: content
        buttons: [
          {
            class: 'primary'
            text: 'OK'
            action: ( )->
              save
                title: this.content.title
                description: this.content.description
                from: this.content.from
                to: this.content.to

              return
          }
          {
            text: 'Del'
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