@CardsMvc.factory 'Flash', [ '$timeout', ($timeout) ->

  class Flash
    flashes: []

    _push: (severity, message) ->
      @flashes.push
        severity: severity
        message: message
      $timeout =>
        @flashes[0..1] = []
      , 2000

    success: (message) ->
      @_push('success', message)

    warn: (message) ->
      @_push('warn', message)


  new Flash

]
