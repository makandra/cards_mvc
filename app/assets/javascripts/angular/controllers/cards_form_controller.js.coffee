@CardsMvc.controller 'CardsFormController', ['$routeParams', '$location', 'Card', 'Flash', ($routeParams, $location, Card, Flash) ->

  controller = {}

  cardId = $routeParams.id

  if cardId
    controller.card = Card.$find(cardId)
  else
    controller.card = Card.$build()

  controller.save = (form) ->
    controller.card.saveForm(form).$then ->
      $location.path("/cards")
      if cardId
        Flash.success('Card updated')
      else
        Flash.success('Card created')

  controller.destroy = ->
    if confirm("Delete card?")
      controller.card.$destroy().$then ->
        $location.path("/cards")
        Flash.success('Card deleted')


  controller
]
