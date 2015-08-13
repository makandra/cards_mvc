@CardsMvc.controller 'CardsFormController', ['$routeParams', '$location', 'Card', ($routeParams, $location, Card) ->

  cardId = $routeParams.id

  if cardId
    card = Card.$find(cardId).$then (result) ->
  else
    card = Card.$build()

  save = (form) ->
    card.saveForm(form).$then ->
      $location.path("/cards")



  card: card, save: save
]
