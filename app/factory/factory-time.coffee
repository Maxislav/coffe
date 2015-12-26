angular.module('app')
.factory 'factoryTime', ($filter)->
  times = []
  i = 0;

  normalize = (val) ->
    if val < 10
      val = '0' + val
    '' + val

  while i < 24
    times.push({
      index: i,
      value: normalize(i) + ".00"
    })
    i++

  {times: times}