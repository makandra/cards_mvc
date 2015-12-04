@app.controller 'Cards::ShowController', ['$routeParams', '$location', '$sce', 'Card', ($routeParams, $location, $sce, Card) ->

  cardId = $routeParams.id


  @card = Card.$find(cardId).$then (result) =>
    @card.body = $sce.trustAsHtml(@card.body)
    for page in @card.extra_pages
      page.body = $sce.trustAsHtml(page.body)

  return
]
