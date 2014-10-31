import Ember from 'ember';

export default Ember.Component.extend({

    classNames: ['alert', 'alert-global'],

    classNameBindings: ['active', 'type'],

    active: function() {
        return this.get('model.active');
    }.property('model.active'),

    type: function() {
        return 'alert-' + this.get('model.type');
    }.property('model.type'),

    actions: {
        close: function() {
            this.get('model').hide();
        }
    }

});
