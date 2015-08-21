@app.apiClient.add('cards')
client = @app.apiClient.cards

class @app.Card

  constructor: (data) ->
    $.extend(@, data)

  @search: (params) ->
    client.read(params).then (data) ->
      cards = (new Card(card) for card in data.cards)
      cards.metadata = data.meta
      cards

