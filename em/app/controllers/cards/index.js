import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'query'],

  queryChanged: Ember.observer('query', function() {
    this.set('searchQuery', this.get('query'));
  }),
  searchQueryChanged: Ember.observer('searchQuery', function() {
    Ember.run.debounce(this, 'searchNow', this.get('searchQuery'), 200);
  }),

  searchNow(query) {
    this.set('query', query);
    this.set('page', 1);
  },

  actions: {
    goToPage(page) {
      this.set('page', page);
    }
  }
});
