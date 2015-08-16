@CardsMvc.controller 'SessionController', [ '$location', 'Session', ($location, Session) ->

  controller = {}

  Session.watch ->
    controller.signedIn = Session.signedIn

  controller.signIn = ->
    Session.signIn()

  controller.signOut = ->
    Session.signOut().then ->
      $location.path('/cards')

  controller

]
