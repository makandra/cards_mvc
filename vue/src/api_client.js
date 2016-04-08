export default new $.RestClient('/api/')

window.setCsrfToken = (token) => {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': token
    }
  });
}

