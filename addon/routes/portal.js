import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({

    allowedRoles: [],

    beforeModel: function(transition) {
        return ajax({
            type: 'GET',
            url: '/' + this.get('session-config.apiNamespace') + '/sessions'
        }).then(function(response) {

            if (!this.allowedRoles.length) {
                this.session.set('user', response.user);
                return;
            }

            for (var i = 0; i < this.allowedRoles.length; i++)
                if (response.user.roles.contains(this.allowedRoles[i])) {
                    this.session.set('user', response.user);
                    return;
                }

            this.redirectToSignIn(transition);

        }.bind(this), function(){
            this.redirectToSignIn(transition);
        }.bind(this));

    },

    redirectToSignIn: function(transition) {
        this.session.set('transitionOnSignIn', transition);
        this.replaceWith('authentication');
    },

    actions: {
        error: function(error, transition) {
            if (error && error.status === 401) {
                // TODO: do a full reload to clear any caches, but set redirect=URL so that user returns to the proper URL.
                this.session.set('user', null);
                this.session.set('transitionOnSignIn', transition);
                this.transitionTo('authentication');
                return;
            }

            return true;
        }
    }

});
