import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    done() {
      this.transitionToRoute('cards.index');
    }
  }
});
