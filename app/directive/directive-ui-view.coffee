angular.module('app')
.directive 'uiView', ($rootScope, $stateParams) ->
  week = null
  {
  restrict: 'A',
  link: (scope, el, attr)->
#console.log(attr.uiView)
    animStart = null
    animEnd = null
    if attr.uiView == 'main'
      scope.$watch ->
        $stateParams.week
      , (val)->
        if week==null
          week = val
          console.log('none')
        else if week < parseInt(val)
          console.log('up')
          el.addClass('up')
        else
          el.removeClass('up')
          console.log('down')
        week = val
        return


      animStart = $rootScope.$on 'animStart', ->
        console.log 'animStart'
        return

      animEnd = $rootScope.$on 'animEnd', ->
        console.log 'animEnd'
        return


    scope.$on '$destroy', ->
      if animStart
        animStart()
      if animEnd
        animEnd()
    return
  }