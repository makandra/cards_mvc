import Ember from 'ember';
import Card from 'em/models/card';

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    },
    query: {
      refreshModel: true
    },
  },

  model (params) {
    return Card.all(params);
  },
});
