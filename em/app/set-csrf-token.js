export default function(token) {
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': token
    }
  });
}
