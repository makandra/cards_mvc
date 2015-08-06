@CardsMvc.controller 'CardsFormController', ['$routeParams', '$location', 'Card', ($routeParams, $location, Card) ->

  cardId = $routeParams.id

  if cardId
    card = Card.get(id: cardId)
  else
    card = new Card()

  save = ->
    save = if cardId
      card.$update
    else
      card.$save

    save().then ->
      $location.path("/cards/#{card.id}/edit")


  card: card, save: save
]
