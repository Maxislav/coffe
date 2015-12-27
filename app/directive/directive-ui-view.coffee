angular.module('app')
.directive 'uiView', ($rootScope, $stateParams) ->
  week = null
  {
  restrict: 'A',
  link: (scope, el, attr)->
#console.log(attr.uiView)
    animStart = null
    animEnd = null

    increase = false;
    if attr.uiView == 'main'
      scope.$watch ->
        $stateParams.week
      , (val)->
        if week==null
          week = val
          console.log('none')
        else if week < parseInt(val)
          console.log('up')
          increase = true
          el.removeClass('anim-slide-right')
          el.addClass('anim-slide-left')
        else
          increase = false
          el.removeClass('anim-slide-left')
          el.addClass('anim-slide-right')
          console.log('down')
        week = val
        return


      animStart = $rootScope.$on 'animStart', ->
        console.log 'animStart'
        return

      animEnd = $rootScope.$on 'animEnd', ->
        console.log 'animEnd'
        el.removeClass('anim-slide-left')
        el.removeClass('anim-slide-right')
        return


    scope.$on '$destroy', ->
      if animStart
        animStart()
      if animEnd
        animEnd()
    return
  }