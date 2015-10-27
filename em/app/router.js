import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  baseURL: config.baseURL,
  location: config.locationType
});

Router.map(function() {
  this.route('cards', function() {
    this.route('edit', { path: '/:card_id/edit' });
    this.route('new');
    this.route('show', { path: '/:card_id' });
  });
  this.route('about');
});

export default Router;
