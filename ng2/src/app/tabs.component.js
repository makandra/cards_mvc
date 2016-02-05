import {Component, QueryMetadata, QueryList} from 'angular2/core';


@Component({
  selector: 'tab',
  template: `
    <div class="tab-pane" *ngIf="active">
      <ng-content></ng-content>
    </div>
  `,
  inputs: ['title']
})
class TabComponent {
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
        anyActive = anyActive && tab.active;
      }
      if (!anyActive && tabs.length > 0) {
        tabs.first.active = true;
      }
    });
  }

  activate(tab) {
    for (let tab of this.tabs) {
      tab.active = false;
    }
    tab.active = true;
    return false;
  }
}


export const TAB_DIRECTIVES = [TabComponent, TabsComponent];
