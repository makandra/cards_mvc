@CardsMvc.controller 'CardsShowController', ['$routeParams', '$location', '$sce', 'Card', ($routeParams, $location, $sce, Card) ->

  controller = {}

  cardId = $routeParams.id
  controller.card = Card.$find(cardId).$then (result) ->
    controller.body = $sce.trustAsHtml(controller.card.body)

  controller
]
