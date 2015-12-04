@app.factory 'Card', ['restmod', '$q', (restmod, $q) ->

  restmod.model('/api/cards').mix
    $extend:
      Record:
        saveForm: (form) ->

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
           while form.$error.remote
             setFieldErrors(form.$error.remote[0], [])

           for name, fieldErrors of allErrors
             setFieldErrors(form[name], fieldErrors)



         @$save().$then ->
           setErrors({})
         , (response) ->
           setErrors(response.$response.data.errors)
           $q.reject(response)
]
