uuid = 0

@CardsMvc.directive 'ckeditor', [ '$q', '$timeout', ($q, $timeout) ->
  require: 'ngModel'
  restrict: 'E'
  template: """
              <textarea name="{{uid}}" class="form-control"></textarea>
            """
  link: (scope, element, attributes, ngModel) ->
    uuid += 1
    scope.uid = "ckeditor_#{uuid}"
    editor = null
    editorReady = $q (resolve) ->
      $timeout ->
        newEditor = CKEDITOR.replace(scope.uid)
        newEditor.setData '', ->
          editor = newEditor
          resolve()
        newEditor.on 'change', ->
          ngModel.$setViewValue(editor.getData())

    ngModel.$render = ->
      if ngModel.$viewValue
        editorReady.then ->
          editor.setData(ngModel.$viewValue)


    scope.$on '$destroy', ->
      newEditor?.destroy()

]
