import {Component} from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {CardService} from './service.js';
import {TAB_DIRECTIVES} from '../tabs.component.js';

@Component({
  templateUrl: '/ng2/cards/edit.html',
  providers: [CardService],
  directives: [...TAB_DIRECTIVES, ...ROUTER_DIRECTIVES]
})
export class CardEditComponent {
  constructor(routeParams: RouteParams, cardService: CardService) {
    this._cardService = cardService;
    this._params = routeParams.params;
  }

  ngOnInit() {
    this._cardService.one(this._params.id).subscribe(card => {
      this.card = card;
    });
  }

  addPage(event) {
    this.card.extra_pages.push({});
    event.preventDefault();
  }

  removePage(page) {
    let index = this.card.extra_pages.indexOf(page);
    if ( index >= 0 ) {
      this.card.extra_pages.splice(index, 1);
    }
  }

  save(form) {
    this._cardService.save(this.card);
  }
}
