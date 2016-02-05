import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {CardsIndexComponent} from './index.component.js'
import {CardShowComponent} from './show.component.js'
import {CardEditComponent} from './edit.component.js'

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  directives: [RouterOutlet]
})
@RouteConfig([
  { path: '/', name: 'Index', component: CardsIndexComponent, useAsDefault: true },
  { path: '/:id', name: 'Show', component: CardShowComponent },
  { path: '/:id/edit', name: 'Edit', component: CardEditComponent }
])
export class CardsComponent {
}
