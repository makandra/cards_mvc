@CardsMvc.controller 'CardsFormController', ['$routeParams', '$location', 'Card', ($routeParams, $location, Card) ->

  controller = {}

  cardId = $routeParams.id

  if cardId
    controller.card = Card.$find(cardId)
  else
    controller.card = Card.$build()

  controller.save = (form) ->
    controller.card.saveForm(form).$then ->
      $location.path("/cards")

  controller.destroy = ->
    if confirm("Delete card?")
      controller.card.$destroy().$then ->
        $location.path("/cards")


  controller
]
