import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {CardsIndexComponent} from './index.component.js'

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  directives: [RouterOutlet]
})
@RouteConfig([
  { path: '/', name: 'Index', component: CardsIndexComponent, useAsDefault: true }
])
export class CardsComponent {
}
