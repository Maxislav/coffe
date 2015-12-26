angular.module('app').directive 'cDay', (serviceDialog, factoryLocalStorage, $filter) ->
  {
  restrict: 'A'
# scope: cDay: '='
  controller: ($scope) ->
    this.getDate = ()->
      $scope.day.date

    return
  link: (scope, el, attr) ->

#times = scope.cDay.times
    times = scope[attr.cDay].times

    save = (obj)->
      times.push(obj)
      factoryLocalStorage.setStorage(scope[attr.cDay])
      return


    dialogShow = ->
      serviceDialog.add
        templateUrl: 'build/templates/dialog/dialog-base.html'
        title: 'Создать событие'
        content: {
          description: '',
          title: ''
          from: '',
          to: ''
        }

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