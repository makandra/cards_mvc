@CardsMvc.controller 'SessionController', [ '$location', 'Flash', 'Session', ($location, Flash, Session) ->

  controller = {}

  Session.watch ->
    controller.signedIn = Session.signedIn

  controller.signIn = ->
    Session.signIn().then ->
      Flash.success('Signed in')

  controller.signOut = ->
    Session.signOut().then ->
      $location.path('/cards')
      Flash.success('Signed out')

  controller

]
