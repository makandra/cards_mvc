(function() {
  apiClient.add('cards')
  client = apiClient.cards

  window.Card = class Card {
    constructor(data) {
      $.extend(this, data)
    }

    static search(params) {
      return client.read(params)
        .then(data => {
          cards = data.cards.map(card => {
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
      return client.update(this.id, { card: this.attributes() })
        .then(data => {
          Object.assign(this, data.card)
          return this;
        }, error => {
          return error.responseJSON.errors;
        });
    }


    attributes() {
      return Object.assign({}, this);
    }
  }
})();
