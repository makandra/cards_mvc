#= require jquery2
#= require jquery.rest
#= require lodash
#= require riot
#= require_self
#= require_tree ./services
#= require_tree ./tags


@app = {}

@app.apiClient = new $.RestClient('/api/')


@app.setCsrfToken = (token) ->
  $.ajaxSetup
    headers:
      'X-CSRF-Token': token

$ =>
  riot.mount('outlet', router: @app.router)
  riot.mount('navigation', router: @app.router)
  @app.router.start()
