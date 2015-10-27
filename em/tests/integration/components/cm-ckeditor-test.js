import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cm-ckeditor', 'Integration | Component | cm ckeditor', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cm-ckeditor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cm-ckeditor}}
      template block text
    {{/cm-ckeditor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
