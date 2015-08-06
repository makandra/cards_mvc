#= require angular
#= require angular-route
#= require angular-resource
#
#= require_self
#= require_tree ./services
#= require_tree ./controllers
#= require_tree ./directives
#= require_tree ./filters


@CardsMvc = angular.module('cards-mvc', ['ngRoute', 'ngResource'])

@CardsMvc.config ['$routeProvider', ($routeProvider) ->
  $routeProvider
    .when '/cards',
      templateUrl: 'angular/cards/index.html'
      controller: 'CardsIndexController'
      controllerAs: 'ctrl'
    .when '/cards/new',
      templateUrl: 'angular/cards/new.html'
      controller: 'CardsFormController'
      controllerAs: 'ctrl'
    .when '/cards/:id/edit',
      templateUrl: 'angular/cards/edit.html'
      controller: 'CardsFormController'
      controllerAs: 'ctrl'
    .when '/about',
      templateUrl: 'shared/about.html'
    .otherwise
      redirectTo: '/cards'

]

@CardsMvc.config ['$httpProvider', ($httpProvider) ->
  angular.extend $httpProvider.defaults,
    xsrfCookieName: 'CSRF-TOKEN'
    xsrfHeaderName: 'X-CSRF-Token'
]
