import {Component} from 'angular2/core';
import {ROUTER_PROVIDERS, RouteParams} from 'angular2/router';
import {CardService} from './service.js';

@Component({
  templateUrl: '/ng2/cards/edit.html',
  providers: [CardService, ...ROUTER_PROVIDERS]
})
export class CardEditComponent {
  constructor(params: RouteParams, cardService: CardService) {
    this._cardService = cardService;
    this._params = params;
  }

  ngOnInit() {
    console.log("REACHED");
    this._cardService.one(params.id).subscribe(card => {
      this.card = card;
    });
  }
}
