@CardsMvc.controller 'CardsIndexController', [ 'Card', (Card) ->

  controller = {}

  Card.query().$promise.then (result) ->
    controller.cards = result

  controller
]
