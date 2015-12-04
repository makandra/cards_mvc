@app.directive 'tabs', [->

  tabUid = 0

  class Tab


  transclude: true
  scope: {}
  restrict: 'E'
  template: """
            <ul class="nav nav-tabs">
              <li ng-repeat="tab in tabs" ng-class="{active: tab.active}">
                <a href ng-click="activate(tab)">{{ tab.title }}</a>
              </li>
            </ul>
            <div class='tab-content' ng-transclude>
            </div>
            """

  controller: ['$scope', ($scope) ->
    @tabs = []

    @registerTab = (index) ->
      tab = new Tab()
      @tabs[index..(index-1)] = [tab]
      if @tabs.length == 1
        tab.active = true
      tab

    @unregisterTab = (tab) ->
      index = @tabs.indexOf(tab)
      if index >= 0
        @tabs[index..index] = []

    return
  ]


  link: (scope, element, attributes, controller) ->
    scope.tabs = controller.tabs


    scope.activate = (tab) ->
      shouldContinue = tab.activate?()
      if shouldContinue != false
        for otherTab in controller.tabs
          otherTab.active = false
        tab.active = true
]


@app.directive 'tab', [->

  require: '^tabs'
  transclude: true
  restrict: 'E'
  scope:
    ngActivate: '&'
  template: """
            <div class="tab-pane" ng-show="tab.active" ng-transclude>
            </div>
            """

  link: (scope, element, attributes, tabsController) ->
    scope.tab = null

    init = ->
      scope.tab = buildTab()

      attributes.$observe 'title', (title) ->
        scope.tab.title = title

      scope.$on '$destroy', ->
        tabsController.unregisterTab(scope.tab)


    buildTab = ->
      index = element.closest('tabs').find('tab').index(element)
      tab = tabsController.registerTab(index)
      tab.activate = scope.ngActivate if attributes.ngActivate?

      tab

    init()
]
