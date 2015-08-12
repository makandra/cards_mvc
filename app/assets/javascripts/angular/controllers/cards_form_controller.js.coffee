@CardsMvc.controller 'CardsFormController', ['$routeParams', '$location', 'Card', ($routeParams, $location, Card) ->

  cardId = $routeParams.id

  if cardId
    card = Card.get(id: cardId)
  else
    card = new Card()

  save = (form) ->
    card.save(form).then ->
      $location.path("/cards")



  card: card, save: save
]
