import Ember from 'ember';
import Card from 'em/models/card';

export default Ember.Route.extend({
  model() {
    return Card.create();
  }
});
