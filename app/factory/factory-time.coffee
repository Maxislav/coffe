angular.module('app')
.factory 'factoryTime', ($filter)->
    times = []
    i = 0;

    normalize = (val) ->
      if val < 10
        val = '0' + val
      '' + val

    while i<24
      times.push({
        value: normalize(i)+".00",
        index: i
      })
      i++

    {times:times }