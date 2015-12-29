angular.module('app')
.controller 'weekControl', [
  '$scope',
  '$stateParams',
  'factoryWeek',
  'serviceDialog',
  'factoryLocalStorage',
  '$filter',
  ($scope,
   $stateParams,
   factoryWeek,
   serviceDialog,
   factoryLocalStorage,
   $filter) ->
    $scope.setWeek($stateParams.week)

    $scope.week = factoryWeek.getWeek($stateParams.week)

    $scope.createEvent = (day)->
      save =(obj)->
        day.times.push(obj)
        factoryLocalStorage.setStorage(day)

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
              save
                  dayDate: day.date.getTime()
                  dayDateString: $filter('date')(day.date, 'dd.MM.yyyy')
                  title: this.content.title
                  description: this.content.description
                  from: this.content.from
                  to: this.content.to

              return
          }
          {text: 'Cancel'}
        ]



    return

]