@app.service 'Session', [ '$http', ($http) ->

  callbacks = []

  @signedIn = false


  @signIn = =>
    $http.post('/api/session').then =>
      @set(true)

  @signOut = =>
    $http.delete('/api/session').then =>
      @set(false)

  @watch = (callback) ->
    callbacks.push(callback)
    callback()


  @set = (signedIn) =>
    @signedIn = signedIn
    for callback in callbacks
      callback()

  return
]

@app.run (Session) -> Session.set(false)
