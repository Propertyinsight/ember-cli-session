import Ember from 'ember';
import DS from 'ember-data';
import ErrorParser from '../mixins/error-parser';

export default Ember.Object.extend(ErrorParser, {

    _deactivateTimer: null,

    messages: [],
    type: 'info',
    active: false,

    show: function(messages, duration, type) {

        // if this is called directly from records.save() reject, 
        // then if the server returns 422, then messages will be an instance of DS.InvalidError,
        // otherwise, it will be a jqXHR object

        if (this.get('_deactivateTimer'))
            Ember.run.cancel(this.get('_deactivateTimer'));

        this.set('messages', this.getErrorMessages(messages));

        this.setProperties({
            type: type || 'danger',
            active: true
        });

        if (!duration)
            return;

        this.set('_deactivateTimer', 
            Ember.run.later(
                this, 
                function() {
                    this.hide();
                },
                duration
            )
        );
    },

    hide: function() {
        this.setProperties({
            messages: [],
            active: false
        });
    }

});
