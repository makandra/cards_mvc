@app.controller 'Cards::IndexController', [ '$scope', '$location', '$timeout', 'Card', ($scope, $location, $timeout, Card) ->

  scheduledSearch = null


  init = =>
    $scope.$on '$routeUpdate', =>
      updateIndex()

    updateIndex()


  @search = (query) =>
    @loading = true
    $timeout.cancel(scheduledSearch) if scheduledSearch?
    scheduledSearch = $timeout =>
      scheduledSearch = null
      if query == ''
        $location.search({})
      else
        $location.search(query: query)
    , 200

  @goToPage = (page) ->
    $location.search(page: page, query: $location.search().query)


  updateIndex = =>
    @loading = true
    { query, page } = $location.search()
    @searchQuery = query
    @cards = Card.$search(query: query, page: page).$then =>
      @loading = false


  init()
  return
]
