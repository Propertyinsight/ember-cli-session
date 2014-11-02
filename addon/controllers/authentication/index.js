import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.ObjectController.extend({

    actions: {
        signIn: function() {
            
            this.set('signingIn', true);
            ajax({
                type: 'PUT',
                url: '/' + this.get('session-config.apiNamespace') + '/authentication/signin',
                contentType: 'application/json',
                data: JSON.stringify({
                    credential: this.getProperties('email', 'password', 'rememberMe')
                })
            }).then(function() {
                this.set('signingIn', false);

                if (!this.session.tryTransitionOnSignIn())
                    this.transitionToRoute('portal');				
            }.bind(this), function(response) {

                this.set('signingIn', false);
                this.session.showGlobalAlert(response.jqXHR, 6000, 'danger');

            }.bind(this));
        }
    }

});
