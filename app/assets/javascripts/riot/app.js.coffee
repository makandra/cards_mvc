#= require jquery2
#= require jquery.rest
#= require riot
#= require_self
#= require_tree ./services
#= require_tree ./tags


@app = {}

@app.apiClient = new $.RestClient('/api/')

$ =>
  riot.mount('outlet', router: @app.router)
  riot.mount('navigation', router: @app.router)
  @app.router.start()
