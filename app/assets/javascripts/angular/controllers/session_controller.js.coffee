@app.controller 'SessionController', [ '$location', 'Flash', 'Session', ($location, Flash, Session) ->

  init = =>
    Session.watch =>
      @signedIn = Session.signedIn


  @signIn = ->
    Session.signIn().then ->
      Flash.success('Signed in')

  @signOut = ->
    Session.signOut().then ->
      $location.path('/cards')
      Flash.success('Signed out')


  init()
  return
]
