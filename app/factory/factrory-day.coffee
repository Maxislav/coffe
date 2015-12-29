angular.module('app')
.factory 'factoryDay', (factoryLocalStorage)->
    {
    addMission: (day, mission)->
      day.times.push(mission)
      factoryLocalStorage.setStorage(day)

    getMission: (mission) ->
      missions = factoryLocalStorage.getMissions()[mission.dayDate].times
      i = 0
      while i < missions.length
        if missions[i] == mission
          return missions[i]
        i++
      null
    delMission: (day, mission) ->
      missions = day.times
      i = 0
      while i < missions.length
        if missions[i] == mission
          missions.splice(i, 1)
          break
        i++
      factoryLocalStorage.setStorage(day)

    editMission : (day)->
      factoryLocalStorage.setStorage(day)
      return


    }