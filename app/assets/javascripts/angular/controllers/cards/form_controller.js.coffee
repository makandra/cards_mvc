@app.controller 'Cards::FormController', ['$routeParams', '$location', 'Card', 'Flash', ($routeParams, $location, Card, Flash) ->

  cardId = $routeParams.id

  init = =>
    if cardId
      @card = Card.$find(cardId)
    else
      @card = Card.$build(extra_pages: [])


  @save = (form) =>
    @card.saveForm(form).$then ->
      $location.path("/cards")
      if cardId
        Flash.success('Card updated')
      else
        Flash.success('Card created')

  @destroy = =>
    if confirm("Delete card?")
      @card.$destroy().$then ->
        $location.path("/cards")
        Flash.success('Card deleted')


  @addPage = =>
    @card.extra_pages ?= []
    @card.extra_pages.push
      body: null
    false

  @removePage = (page) =>
    index = @card.extra_pages.indexOf(page)
    if index >= 0
      @card.extra_pages[index..index] = []


  init()
  return
]
