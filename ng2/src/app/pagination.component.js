import {Component, EventEmitter} from 'angular2/core';


@Component({
  selector: 'cmvc-pagination',
  template: `
    <ul class="pagination" *ngIf='pages.length > 1'>
      <li *ngFor='#page of pages' [ngClass]='{ active: page.current }'>
        <a href (click)='goTo(page.number)'> {{ page.label }} </a>
      </li>
    </ul>
  `,
  inputs: ['info'],
  events: ['navigate'],
})
export class PaginationComponent {
  constructor() {
    this.navigate = new EventEmitter();
  }

  set info(info) {
    this.pages = this._buildPages(info.current_page, info.total_pages);
  }

  goTo(page) {
    this.navigate.next({ page });
    return false;
  }

  _buildPages(current, total) {
    const maxWindowSize = 5;
    const maxOffset = (maxWindowSize - 1) / 2; // the maximum distance to the current page we will show

    let pages = [];

    if (current > 1 + maxOffset) {
      pages.push({
        number: 1,
        label: 1
      });
    }
    if (current > 2 + maxOffset) {
      pages.push({
        number: current - maxOffset - 1,
        label: '…'
      });
    }
    for (let i = Math.max(current - maxOffset, 1); i <= Math.min(current + maxOffset, total); i++) {
      pages.push({
        number: i,
        label: i,
        current: i === current
      });
    }
    if (current < total - maxOffset - 1) {
      pages.push({
        number: current + maxOffset + 1,
        label: '…'
      });
    }
    if (current < total - maxOffset) {
      pages.push({
        number: total,
        label: total
      });
    }
    return pages;
  }
}
