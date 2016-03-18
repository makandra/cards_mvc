import {Component, QueryMetadata, QueryList, EventEmitter} from 'angular2/core';


class CancelableEvent {
  preventDefault() {
    this.prevented = true;
  }
}


@Component({
  selector: 'tab',
  template: `
    <div class="tab-pane" *ngIf="active">
      <ng-content></ng-content>
    </div>
  `,
  inputs: ['title'],
  events: ['activate']
})
class TabComponent {
  constructor() {
    this.active = false;
    this.activate = new EventEmitter(false);
  }

  setActive() {
    event = new CancelableEvent();
    this.activate.emit(event);
    if ( !event.prevented ) {
      this.active = true;
    }
    return this.active;
  }

  setInactive() {
    this.active = false;
  }
}


@Component({
  selector: 'tabs',
  template: `
    <ul class="nav nav-tabs">
      <li *ngFor="#tab of tabs" [ngClass]="{active: tab.active}">
        <a href (click)="activate(tab)">{{ tab.title }}</a>
      </li>
    </ul>
    <div class='tab-content'>
      <ng-content></ng-content>
    </div>
  `
})
@Reflect.metadata('parameters', [[new QueryMetadata(TabComponent)]])
class TabsComponent {
  constructor(tabs: QueryList) {
    this.tabs = tabs;
    this.keepAtLeastOneTabActive(tabs);
  }

  keepAtLeastOneTabActive(tabs) {
    tabs.changes.subscribe(() => {
      let anyActive = false;
      for (let tab of tabs) {
        anyActive = anyActive || tab.active;
      }
      if (!anyActive && tabs.length > 0) {
        tabs.first.setActive();
      }
    });
  }

  activate(tab) {
    if ( tab.setActive() ) {
      for (let otherTab of this.tabs) {
        if ( otherTab != tab ) {
          otherTab.setInactive();
        }
      }
    }
    return false;
  }
}


export const TAB_DIRECTIVES = [TabComponent, TabsComponent];
