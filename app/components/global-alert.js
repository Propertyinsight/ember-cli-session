import Ember from 'ember';
const {
  Component,
  computed
} = Ember;

export default Component.extend({
  classNames: ['alert', 'alert-global'],
  classNameBindings: ['active', 'type'],

  active: computed('model.active', function() {
    return this.get('model.active');
  }),

  type: computed('model.type', function() {
    return 'alert-' + this.get('model.type');
  }),

  actions: {
    close() {
      this.get('model').hide();
    }
  }
});
