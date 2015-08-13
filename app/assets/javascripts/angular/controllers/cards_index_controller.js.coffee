@CardsMvc.controller 'CardsIndexController', [ '$timeout', 'Card', ($timeout, Card) ->

  controller =
    searchQuery: ''

  scheduledSearch = null

  fetchResults = (query) ->
    controller.loading = true
    Card.query(query: query).$promise.then (result) ->
      controller.cards = result
      controller.loading = false


  scheduleSearch = (query) ->
    controller.loading = true
    $timeout.cancel(scheduledSearch) if scheduledSearch?
    scheduledSearch = $timeout ->
      scheduledSearch = null
      fetchResults(query)
    , 200

  controller.search = (query) ->
    scheduleSearch(query)


  fetchResults()

  controller
]
