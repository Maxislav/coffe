angular.module('app')
.factory 'factoryLocalStorage', (localStorageService) ->

  missions = null

  setStorage = (obj)->
    #console.log(obj)
    missions[obj.date.getTime()] = missions[obj.date.getTime()] || {}
    missions[obj.date.getTime()].times = obj.times
    localStorageService.set('missions',angular.fromJson(missions))
    return

  getMissions = ()->
    missions = missions || localStorageService.get('missions') || {}

  {
  setStorage: setStorage
  getMissions: getMissions
  }