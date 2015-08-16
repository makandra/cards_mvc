@CardsMvc.controller 'CardsShowController', ['$routeParams', '$location', '$sce', 'Card', ($routeParams, $location, $sce, Card) ->

  controller = {}

  cardId = $routeParams.id
  controller.card = Card.$find(cardId).$then (result) ->
    controller.card.body = $sce.trustAsHtml(controller.card.body)
    for page in controller.card.extra_pages
      page.body = $sce.trustAsHtml(page.body)

  controller
]
