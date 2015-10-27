import Ember from 'ember';

let uuid = 0;

export default Ember.Component.extend({
  name: Ember.computed(function() {
    uuid = uuid + 1;
    return `ckeditor_${uuid}`;
  }),

  tagName: 'textarea',
  classNames: ['form-control'],
  attributeBindings: ['name'],

  valueObserver: Ember.observer('value', function() {
    this.editorReady.then(() => {
      let value = this.get('value');
      if ( value !== this.editorValue) {
        this.editor.setData(value);
        this.editorValue = value;
      }
    });
  }),

  didInsertElement() {
    let editorReadyDeferred = Ember.RSVP.defer();
    // jshint undef:false
    let newEditor = CKEDITOR.replace(this.get('name'));
    // jshint undef:true
    this.editorReady = editorReadyDeferred.promise;

    newEditor.setData(this.get('value'), () => {
      this.editor = newEditor;
      editorReadyDeferred.resolve();
    });

    newEditor.on('change', () => {
      this.editorValue = newEditor.getData();
      this.set('value', this.editorValue);
    });
  },

  willDestroyElement() {
    if ( this.editor ) {
      this.editor.destroy();
    }
  }
});
