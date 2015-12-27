angular.module('app').directive 'cDay', (serviceDialog, factoryLocalStorage, $filter) ->
  {
  restrict: 'A'
# scope: cDay: '='
  controller: ($scope) ->
    this.getDate = ()->
      $scope.day.date
    this.getDay = ()->
      $scope.day
    this
  link: (scope, el, attr) ->

    times = scope[attr.cDay].times

    save = (obj)->
      times.push(obj)
      factoryLocalStorage.setStorage(scope[attr.cDay])
      return

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

    dialogShow = (e)->
      if !ifNeeded(e.target)
        return
      serviceDialog.add
        templateUrl: 'build/templates/dialog/dialog-base.html'
        title: 'Create event'
        content: {
          description: '',
          title: ''
          from: '',
          to: ''
        }

        buttons: [
          {
            class: 'primary'
            text: 'Ok'
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