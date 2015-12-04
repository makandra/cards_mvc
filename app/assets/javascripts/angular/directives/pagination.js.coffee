@app.directive 'pagination', [ ->

  maxWindowSize = 5
  maxOffset = (maxWindowSize - 1) / 2 # the maximum distance to the current page we will show

  buildPages = (current, total) ->
    pages = []

    if current > 1 + maxOffset
      pages.push
        number: 1
        label: 1

    if current > 2 + maxOffset
      pages.push
        number: current - maxOffset - 1
        label: '…'

    for i in [Math.max(current - maxOffset, 1)..Math.min(current + maxOffset, total)]
      pages.push
        number: i
        label: i
        current: i == current

    if current < total - maxOffset - 1
      pages.push
        number: current + maxOffset + 1
        label: '…'

    if current < total - maxOffset
      pages.push
        number: total
        label: total

    pages


  restrict: 'E'
  scope:
    info: '='
    goTo: '&'
  template: """
              <ul class="pagination" ng-show='pages.length > 1'>
                <li ng-repeat='page in pages' ng-class='{ active: page.current }'>
                  <a href ng-click='goTo({page: page.number})'> {{ page.label }} </a>
                </li>
              </ul>
            """

  link: (scope, element, attributes) ->
    scope.$watch 'info', (paginationInfo) ->
      if paginationInfo
        scope.pages = buildPages(paginationInfo.current_page, paginationInfo.total_pages)
      else
        scope.pages = []
]
