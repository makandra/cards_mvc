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
        editor = CKEDITOR.replace(scope.uid)
        editor.on 'change', ->
          ngModel.$setViewValue(editor.getData())
        editor.on 'loaded', ->
          $timeout ->
            resolve()

    ngModel.$render = ->
      if ngModel.$viewValue
        editorReady.then ->
          editor.setData(ngModel.$viewValue)


    scope.$on '$destroy', ->
      editorReady.then ->
        editor

]
