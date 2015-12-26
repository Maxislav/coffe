angular.module('app').factory 'factoryWeek', ->
  weeks = {}

  getDays = (n) ->

  createWeek = (n) ->
    d = new Date
    day = d.getDay()
    day = if day < 6 then day + 1 else 7
    days = []
    i = 0
    while i < day
      days.push new Date
      i++
    return

  getWeek = (n) ->
    weeks[n] or createWeek(n)

  { getWeek: getWeek }

