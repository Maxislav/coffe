angular.module('app')
.controller 'dayControl',
  ($scope, serviceDialog, factoryDay, $filter) ->

    this.getDate = ()->
      $scope.cDay.date

    this.getDay = ()->
      $scope.cDay

    $scope.createEvent = (day)->
      console.log 'ddsdsd'
      serviceDialog.add
        templateUrl: 'build/templates/dialog/dialog-base.html'
        title: 'Create event'
        content:
          {
            description: '',
            title: ''
            from: '',
            to: ''
          }
        buttons: [
          {
            class: 'primary'
            disabled: 'missionForm.$invalid'
            text: 'Ok'
            action: (d)->
              factoryDay.addMission(
                day,
                {
                  dayDate: day.date.getTime()
                  dayDateString: $filter('date')(day.date, 'dd.MM.yyyy')
                  title: this.content.title
                  description: this.content.description
                  from: this.content.from
                  to: this.content.to
                })
              return
          }
          {text: 'Cancel'}
        ]
    return