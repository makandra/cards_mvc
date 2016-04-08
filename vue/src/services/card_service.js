import apiClient from '../api_client.js'

apiClient.add('cards')

let client = apiClient.cards;

export default class Card {
  constructor(data) {
    this.extra_pages = [];
    $.extend(this, data);
  }

  static search(params) {
    return client.read(params)
      .then(data => {
        let cards = data.cards.map(card => {
          return new Card(card);
        });
        cards.meta = data.meta;
        return cards;
      });
  }

  static find(id) {
    return client.read(id)
      .then(data => {
        return new Card(data.card);
      });
  }

  save() {
    if ( this.id ) {
      var request = client.update(this.id, { card: this.attributes() });
    } else {
      var request = client.create({ card: this.attributes() });
    }

    return request.then(data => {
        Object.assign(this, data.card)
        flash.success(this.id ? 'Card updated' : 'Card created');
        return this;
      }, error => {
        return error.responseJSON.errors;
      });
  }

  destroy() {
    return new Promise((resolve) => {
      client.destroy(this.id)
        .always(() => {
          flash.success('Card deleted');
          resolve();
        });
    });
  }

  attributes() {
    return Object.assign({}, this);
  }
}
