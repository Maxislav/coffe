angular.module('app')
.controller 'missionControl', ($scope, serviceDialog, factoryDay) ->
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
              factoryDay.editMission(day)
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