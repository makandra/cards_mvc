import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';

@Component({
  selector: '[errorsFor]',
  template: `
    <div [ngClass]="{'has-error': !form.controls[errorsFor]?.valid}">
      <ng-content></ng-content>
      <span class="text-danger">
        {{ form.controls[errorsFor]?.errors?.remote }}
      </span>
    </div>
  `,
  inputs: ['errorsFor']
})
export class ErrorsForComponent {
  constructor(form: NgForm) {
    this.form = form;
  }
}
