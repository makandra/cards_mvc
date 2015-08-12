@CardsMvc.factory 'Card', ['$resource', '$q', ($resource, $q) ->

  Card = $resource '/api/cards/:id.json', { id: '@id' }, { 'update': { method: 'PUT' } }

  angular.extend Card.prototype,
    save: (form) ->
      setFieldErrors = (model, errors) ->
        if model
          if errors.length > 0
            model.$setDirty()
            model.$setValidity("remote", false)
            model.remoteMessage = errors.join(', ')
          else
            model.$setValidity("remote", true)
            delete model.remoteMessage

      setErrors = (allErrors) ->
        console.log(allErrors)
        while form.$error.remote
          setFieldErrors(form.$error.remote[0], [])

        for name, fieldErrors of allErrors
          setFieldErrors(form[name], fieldErrors)


      save = =>
        if @id
          @$update()
        else
          @$save()

      save()
        .then (response) ->
          setErrors({})
          response
        .catch (response) ->
          setErrors(response.data.errors)
          $q.reject(response)


  Card
]
