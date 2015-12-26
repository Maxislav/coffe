angular.module('app').directive 'cDay', (serviceDialog) ->
  {
  restrict: 'A'
 # scope: cDay: '='
  link: (scope, el, attr) ->

    #times = scope.cDay.times
    times = scope[attr.cDay].times

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
            action:  (d)->
              times.push({
                title: this.content.title,
                description: this.content.description
                from: this.content.from,
                to: this.content.to
              })
              return
          }
          { text: 'Cancel' }
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