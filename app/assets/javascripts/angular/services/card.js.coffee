@CardsMvc.factory 'Card', ['$resource', ($resource) ->

  $resource '/api/cards/:id.json', { id: '@id' }, { '$update': { method: 'PUT' } },


]
