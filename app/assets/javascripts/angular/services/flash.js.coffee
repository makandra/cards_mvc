@app.service 'Flash', [ '$timeout', ($timeout) ->

  @flashes = []

  @success = (message) ->
    push('success', message)

  @warn = (message) ->
    push('warn', message)


  push = (severity, message) =>
    @flashes.push
      severity: severity
      message: message
    $timeout =>
      @flashes[0..1] = []
    , 2000

  return
]
