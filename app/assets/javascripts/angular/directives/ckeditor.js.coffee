uuid = 0

@app.directive 'ckeditor', [ '$q', '$timeout', ($q, $timeout) ->
  require: 'ngModel'
  restrict: 'E'

  template: """
              <textarea name="{{uid}}" class="form-control"></textarea>
            """

  link: (scope, element, attributes, ngModel) ->
    uuid += 1
    editor = null
    editorReady = null


    scope.uid = "ckeditor_#{uuid}"


    init = ->
      editorReady = initializeEditor()
      ngModel.$render = render
      scope.$on '$destroy', destroy


    initializeEditor = ->
      $q (resolve) ->
        $timeout ->
          newEditor = CKEDITOR.replace(scope.uid)
          newEditor.setData '', ->
            editor = newEditor
            resolve()
          newEditor.on 'change', ->
            ngModel.$setViewValue(editor.getData())

    render = ->
      if ngModel.$viewValue
        editorReady.then ->
          editor.setData(ngModel.$viewValue)

    destroy = ->
      # editor?.destroy() does not work...

    init()
]
