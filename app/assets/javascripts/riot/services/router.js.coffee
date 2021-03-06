@app.router = router = riot.observable()

routes = (collection, id, action) ->
  route = [collection]
  route.push ':id' if id?
  route.push action if action?

  switch route.join('/')
    when 'cards'
      ['cards-index']
    when 'cards/:id'
      ['card', id: id]
    when 'cards/:id/edit'
      ['card-form', id: id]
    when 'about'
      ['about']

routes.otherwise = 'cards'


routeChangeHandler = (params...) ->
  route = routes(params...)
  if route?
    [tag, options] = route
    options ?= {}
    router.trigger 'route', tag, options
  else if routes.otherwise?
    riot.route(routes.otherwise)


router.start = ->
  riot.route routeChangeHandler
  riot.route.exec routeChangeHandler
  riot.route.start()
