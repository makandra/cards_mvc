@CardsMvc.directive 'errorsFor', [->
  require: '^form'
  restrict: 'A'
  scope: {}
  transclude: true
  template: """
              <div ng-class='{"has-error": !model.$valid}'>
                <div ng-transclude>
                </div>
                <span class="text-danger">
                  {{ model.remoteMessage || " " }}
                </span>
              </div>
            """
  link: (scope, element, attributes, formController) ->
    scope.model = formController[attributes.errorsFor]


]
