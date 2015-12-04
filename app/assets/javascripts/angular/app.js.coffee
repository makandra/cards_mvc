#= require jquery2
#= require angular
#= require angular-route
#= require angular-restmod-bundle
#
#= require_self
#= require_tree ./services
#= require_tree ./controllers
#= require_tree ./directives
#= require_tree ./filters


@app = angular.module('cards-mvc', ['ngRoute', 'restmod'])

@app.config ['$routeProvider', ($routeProvider) ->
  $routeProvider
    .when '/cards',
      templateUrl: 'angular/cards/index.html'
      controller: 'Cards::IndexController'
      controllerAs: 'ctrl'
      reloadOnSearch: false
    .when '/cards/new',
      templateUrl: 'angular/cards/new.html'
      controller: 'Cards::FormController'
      controllerAs: 'ctrl'
    .when '/cards/:id',
      templateUrl: 'angular/cards/show.html'
      controller: 'Cards::ShowController'
      controllerAs: 'ctrl'
    .when '/cards/:id/edit',
      templateUrl: 'angular/cards/edit.html'
      controller: 'Cards::FormController'
      controllerAs: 'ctrl'
    .when '/about',
      templateUrl: 'shared/about.html'
    .otherwise
      redirectTo: '/cards'

]

@app.config ['$httpProvider', ($httpProvider) ->
  angular.extend $httpProvider.defaults,
    xsrfCookieName: 'CSRF-TOKEN'
    xsrfHeaderName: 'X-CSRF-Token'
]

@app.config ['restmodProvider', (restmodProvider) ->
  restmodProvider.rebase('DefaultPacker')
  restmodProvider.rebase
    $config:
      style: 'JBuilder'
]
