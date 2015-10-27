import Ember from 'ember';
import Card from 'em/models/card';

export default Ember.Route.extend({
  model (params) {
    return Card.find(params.card_id);
  },
});
