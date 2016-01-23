import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {Navigation} from './navigation.component';
import {CardsComponent} from './cards/component';

@Component({
  selector: 'cmvc-app',
  template: `
    <navigation></navigation>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [Navigation, RouterOutlet]
})
@RouteConfig([
  { path: '/cards/...', name: 'Cards', component: CardsComponent, useAsDefault: true }
])
export class AppComponent {
}
