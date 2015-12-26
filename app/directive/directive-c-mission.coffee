angular.module('app').directive 'cMission', (factoryLocalStorage, serviceDialog) ->
  {
  restrict: 'A',
  require: '?^cDay'
  link: (scope, el, attr, cdsy) ->

    from = scope[attr.cMission].from
    perc = parseFloat(from)*100/24

    #console.log Math.round(perc*100)/100

    el.css('top', Math.round(perc*100)/100 + '%' )

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
            action: (d)->
              save
                dayDate: scope[attr.cDay].date.getTime()
                dayDateString: $filter('date')(scope[attr.cDay].date, 'dd.MM.yyyy')
                title: this.content.title
                description: this.content.description
                from: this.content.from
                to: this.content.to

              return
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