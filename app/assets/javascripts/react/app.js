//= require jquery
//= require jquery.rest
//= require rx.lite
//= require rx.binding
//= require react
//= require react-router
//= require_self
//= require_tree ./services
//= require_tree ./components

apiClient = new $.RestClient('/api/')

window.setCsrfToken = (token) => {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': token
    }
  });
}
