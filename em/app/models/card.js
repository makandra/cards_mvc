import Ember from 'ember';
import apiClient from 'em/services/api-client';

apiClient.add('cards');
var client = apiClient.cards;

var Card = Ember.Object.extend({
  save() {
    let properties = { card: this.getProperties('title', 'body') };
    let id = this.get('id');
    if ( id ) {
      var request = client.update(id, properties);
    } else {
      var request = client.create(properties);
    }
    return request.then(data => {
      this.setProperties(data.card);
    }, error => {
      this.set('errors', error.responseJSON.errors);
    });
  },

  destroy() {
    let deferred = Ember.RSVP.defer();
    client.destroy(this.get('id')).always(() => {
      deferred.resolve();
    });
    return deferred.promise;
  }
});

Card.reopenClass({
  all(params) {
    return client.read(params || {}).then(data => {
      let result = [];
      for (let card of data.cards ) {
        result.push(Card.create(card));
      }
      result.set('meta', data.meta);
      return result;
    });
  },

  find(id) {
    return client.read(id).then(data => {
      return Card.create(data.card);
    });
  }
});

export default Card;
