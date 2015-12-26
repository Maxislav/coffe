angular.module('app').factory 'factoryWeek', ->
  createWeek = undefined
  getDays = undefined
  getWeek = undefined
  weeks = undefined

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
    day = if day then day  else 6;
    day = -day+1
    days = []
    i = 0
    while i < 7
      days.push {
        date:getDate(day+(7*n)),
        current: day+(7*n) == 0,
        times: []
      }
      day++
      i++

    weeks[n]=days

  getWeek = (n) ->
    weeks[n] or createWeek(n)

  { getWeek: getWeek }
