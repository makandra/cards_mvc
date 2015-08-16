@CardsMvc.controller 'CardsFormController', ['$routeParams', '$location', 'Card', 'Flash', ($routeParams, $location, Card, Flash) ->

  controller = {}

  cardId = $routeParams.id

  if cardId
    controller.card = Card.$find(cardId)
  else
    controller.card = Card.$build(extra_pages: [])

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


  controller.addPage = ->
    controller.card.extra_pages ?= []
    controller.card.extra_pages.push
      body: null
    false

  controller.removePage = (page) ->
    index = controller.card.extra_pages.indexOf(page)
    console.log index
    if index >= 0
      controller.card.extra_pages[index..index] = []


  controller
]
