angular.module('app').controller('weekControl', [
  '$scope', '$stateParams', 'factoryWeek', 'serviceDialog', 'factoryDay', '$filter', function($scope, $stateParams, factoryWeek, serviceDialog, factoryDay, $filter) {
    var beforeRem;
    $scope.setWeek($stateParams.week);
    $scope.week = factoryWeek.getWeek($stateParams.week);
    $scope.createEvent = function(day) {
      return serviceDialog.add({
        templateUrl: 'build/templates/dialog/dialog-base.html',
        title: 'Create event',
        content: {
          description: '',
          title: '',
          from: '',
          to: ''
        },
        buttons: [
          {
            "class": 'primary',
            disabled: 'missionForm.$invalid',
            text: 'Ok',
            action: function(d) {
              factoryDay.addMission(day, {
                dayDate: day.date.getTime(),
                dayDateString: $filter('date')(day.date, 'dd.MM.yyyy'),
                title: this.content.title,
                description: this.content.description,
                from: this.content.from,
                to: this.content.to
              });
            }
          }, {
            text: 'Cancel'
          }
        ]
      });
    };
    $scope.editEvent = function(day, _mission) {
      var mission;
      mission = angular.copy(_mission);
      serviceDialog.add({
        templateUrl: 'build/templates/dialog/dialog-base.html',
        title: 'Edit event',
        content: mission,
        buttons: [
          {
            "class": 'primary',
            text: 'Apply',
            disabled: 'missionForm.$invalid',
            action: function() {
              _mission.title = this.content.title;
              _mission.description = this.content.description;
              _mission.from = this.content.from;
              _mission.to = this.content.to;
              factoryDay.editMission(day);
            }
          }, {
            text: 'Delete',
            action: function() {
              return beforeRem(day, _mission);
            }
          }, {
            text: 'Cancel'
          }
        ]
      });
      return null;
    };
    beforeRem = function(day, _mission) {
      return serviceDialog.add({
        templateUrl: 'build/templates/dialog/dialog-remove.html',
        title: 'Confirm delete',
        content: "Are you sure you want to delete the event?",
        buttons: [
          {
            text: 'Delete',
            action: function() {
              return factoryDay.delMission(day, _mission);
            }
          }, {
            text: 'Cancel',
            action: function() {
              return $scope.editEvent(day, _mission);
            }
          }
        ]
      });
    };
  }
]);
