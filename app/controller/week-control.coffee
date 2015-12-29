angular.module('app')
.controller 'weekControl', [
  '$scope',
  '$stateParams',
  'factoryWeek',
  'serviceDialog',
  'factoryDay'
  '$filter',
  ($scope,
   $stateParams,
   factoryWeek,
   serviceDialog,
   factoryDay,
   $filter) ->
    $scope.setWeek($stateParams.week)

    $scope.week = factoryWeek.getWeek($stateParams.week)

    $scope.createEvent = (day)->
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

    $scope.editEvent = (day, _mission)->
      mission = angular.copy(_mission)
      serviceDialog.add
        templateUrl: 'build/templates/dialog/dialog-base.html'
        title: 'Edit event'
        content: mission
        buttons: [
          {
            class: 'primary'
            text: 'Apply'
            disabled: 'missionForm.$invalid'
            action: ()->
              _mission.title = this.content.title
              _mission.description = this.content.description
              _mission.from = this.content.from
              _mission.to = this.content.to
              factoryDay.editMission( day )
              return
          }
          {
            text: 'Delete'
            action: ()->
              beforeRem(day, _mission)
          }
          {text: 'Cancel'}
        ]
      null

    beforeRem = (day, _mission)->
      serviceDialog.add
        templateUrl: 'build/templates/dialog/dialog-remove.html'
        title: 'Confirm delete'
        content: "Are you sure you want to delete the event?"
        buttons: [
          {
            text: 'Delete'
            action: ()->
              factoryDay.delMission(day, _mission)
          }
          {
            text: 'Cancel'
            action: ()->
              $scope.editEvent(day, _mission)
          }
        ]
    return

]