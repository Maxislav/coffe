angular.module('app')
.controller 'missionControl', ($scope, serviceDialog, factoryDay) ->
    $scope.editEvent = (day, _mission)->
      mission = angular.copy(_mission) #разрыв связи для отмены дейсвий
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
              #копирование параметров
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

    #показываем предупреждение перед удалением
    beforeRem = (day, _mission)->
      serviceDialog.add
        templateUrl: 'build/templates/dialog/dialog-remove.html'
        title: 'Confirm delete'
        content: "Are you sure you want to delete the event?"
        buttons: [
          {
            text: 'Delete'
            action: ()->
              # удаляем и сохроаняем локал стораже
              factoryDay.delMission(day, _mission)
          }
          {
            text: 'Cancel'
            action: ()->
              #возврат к редактированию
              $scope.editEvent(day, _mission)
          }
        ]
    return