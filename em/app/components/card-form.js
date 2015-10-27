import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      this.get('card').save().then(() => {
        this.getWithDefault('onDone', Ember.K)();
      });
    },
    destroy() {
      this.get('card').destroy().then(() => {
        this.getWithDefault('onDone', Ember.K)();
      });
    },
  },
});
