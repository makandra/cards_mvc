#= require jquery2
#= require jquery.rest
#= require riot
#= require_self
#= require_tree ./services
#= require_tree ./tags


@app = {}

@app.apiClient = new $.RestClient('/api/')

$ ->
  riot.mount('cards')
