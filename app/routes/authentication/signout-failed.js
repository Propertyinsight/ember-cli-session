import Ember from 'ember';

export default Ember.Route.extend({

    actions: {
        tryAgain: function() {
            window.location.href = this.get('session-config.baseURL');
        }
    }

});
