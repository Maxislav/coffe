angular.module('app').factory 'factoryWeek',(factoryLocalStorage) ->
  createWeek = undefined
  getDays = undefined
  getWeek = undefined
  weeks = undefined
  missions = factoryLocalStorage.getMissions()
  #console.log

  detMissions = (val)->
    if missions[val]
      missions[val].times
    else
      []


  getDate = (n) ->
    d = new Date();
    new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

  weeks = {}

  createWeek = (n) ->

    d = undefined
    day = undefined
    days = undefined
    i = undefined
    d = new Date()
    day = d.getDay()
    day = if day then day  else 7;
    day = -day+1
    days = []
    i = 0
    while i < 7
      days.push {
        date:getDate(day+(7*n)),
        current: day+(7*n) == 0,
        times: detMissions(getDate(day+(7*n)).getTime())
      }
      day++
      i++
    weeks[n]=days


  getWeek = (n) ->
    weeks[n] or createWeek(n)

  { getWeek: getWeek }
