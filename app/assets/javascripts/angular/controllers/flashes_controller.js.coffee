@app.controller 'FlashesController', [ 'Flash', (Flash) ->

  @flashes = Flash.flashes

  return
]
