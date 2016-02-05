import {Component, EventEmitter} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {CardService} from './service.js';
import {PaginationComponent} from '../pagination.component.js';
import {Subject} from 'rxjs/Rx.js';

@Component({
  templateUrl: '/ng2/cards/index.html',
  providers: [CardService],
  directives: [PaginationComponent, RouterLink],
})
export class CardsIndexComponent {
  constructor(cardService: CardService) {
    this.searchEvent = new Subject();
    this._cardService = cardService;
  }

  ngOnInit() {
    this.query = '';
    this.page = 1;
    this._fetch();
    this.searchEvent.debounceTime(500).subscribe(query => this.search(query));
  }

  goToPage(page) {
    this.page = page;
    this._fetch();
  }

  search(query) {
    this.query = query;
    this._fetch();
  }

  _fetch() {
    this.loading = true;
    this._cardService.all({ page: this.page, query: this.query }).subscribe(cards => {
      this.cards = cards;
      this.loading = false;
    });
  }
}
