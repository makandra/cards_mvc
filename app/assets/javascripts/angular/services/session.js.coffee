@CardsMvc.factory 'Session', [ '$http', ($http) ->

  class Session
    _callbacks: []

    signedIn: false

    signIn: ->
      $http.post('/api/session').then =>
        @set(true)

    signOut: ->
      $http.delete('/api/session').then =>
        @set(false)

    watch: (callback) ->
      @_callbacks.push(callback)
      callback()

    set: (signedIn) ->
      @signedIn = signedIn
      for callback in @_callbacks
        callback()

  new Session
]

@CardsMvc.run (Session) -> Session.set(false)
