@CardsMvc.controller 'CardsIndexController', [ '$scope', '$location', '$timeout', 'Card', ($scope, $location, $timeout, Card) ->

  controller = {}

  scheduledSearch = null

  updateIndex = ->
    controller.loading = true
    { query, page } = $location.search()
    controller.searchQuery = query
    controller.cards = Card.$search(query: query, page: page).$then ->
      controller.loading = false

  controller.search = (query) ->
    controller.loading = true
    $timeout.cancel(scheduledSearch) if scheduledSearch?
    scheduledSearch = $timeout ->
      scheduledSearch = null
      if query == ''
        $location.search({})
      else
        $location.search(query: query)
    , 200

  controller.goToPage = (page) ->
    $location.search(page: page, query: $location.search().query)


  $scope.$on '$routeUpdate', ->
    updateIndex()

  updateIndex()

  controller
]
