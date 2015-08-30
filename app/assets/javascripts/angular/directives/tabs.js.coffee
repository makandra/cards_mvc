@CardsMvc.directive 'tabs', [->

  tabUid = 0

  class Tab


  transclude: true
  scope: {}
  restrict: 'E'
  template: """
            <ul class="nav nav-tabs">
              <li ng-repeat="tab in ctrl.tabs" ng-class="{active: tab.active}">
                <a href ng-click="ctrl.activate(tab)">{{ tab.title }}</a>
              </li>
            </ul>
            <div class='tab-content' ng-transclude>
            </div>
            """
  controllerAs: 'ctrl'
  bindToController: true
  controller: ->
    controller =
      tabs: []

    controller.registerTab = (index) ->
      tab = new Tab()
      controller.tabs[index..(index-1)] = [tab]
      if controller.tabs.length == 1
        tab.active = true
      tab

    controller.unregisterTab = (tab) ->
      index = controller.tabs.indexOf(tab)
      if index >= 0
        controller.tabs[index..index] = []

    controller.activate = (tab) ->
      shouldContinue = tab.activate?()
      if shouldContinue != false
        for otherTab in controller.tabs
          otherTab.active = false
        tab.active = true


    controller

]


@CardsMvc.directive 'tab', [->

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
    index = element.closest('tabs').find('tab').index(element)
    tab = tabsController.registerTab(index)
    attributes.$observe 'title', (title) ->
      tab.title = title
    tab.activate = scope.ngActivate if attributes.ngActivate?
    scope.tab = tab

    scope.$on '$destroy', ->
      tabsController.unregisterTab(tab)

]
