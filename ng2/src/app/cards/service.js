import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {SearchQueryService} from '../search_query.service.js';


class Card {
  constructor(attributes) {
    Object.assign(this, attributes);
  }
}

@Injectable()
export class CardService {
  constructor(http: Http) {
    this._http = http;
  }

  all(params) {
    return this._http.get('/api/cards', { search: SearchQueryService.toSearchParams(params) })
      .map(response => {
        let json = response.json();
        let cards = (json.cards || []).map(card => new Card(card))
        cards.meta = json.meta;
        return cards;
      });
  }

  one(id) {
    return this._http.get(`/api/cards/${id}`)
      .map(response => {
        let json = response.json();
        return new Card(json.card)
      });
  }

  save(card, controls) {
    return this._http.patch(`/api/cards/${card.id}`, JSON.stringify({ card: card }))
      .map(response => {
        let json = response.json();
        return new Card(json.card)
      })
      .do(() => {}, response => {
        let errors = response.json().errors;
        if ( errors ) {
          for ( let key in errors ) {
            let control = controls[key];
            if ( control ) {
              control.setErrors({ remote: errors[key] });
              console.log(control, key, errors[key])
            }
          }
        }
      });
  }
}
