import Ember from 'ember';
import ajax from 'ic-ajax';
import config from '../../app/config/environment';

export default Ember.Route.extend({

    beforeModel: function(transition) {
        return ajax({
            type: 'PUT',
            url: '/api_v1/authentication/signout'
        }).then(function(response) {
            window.location.href = config.baseURL + 'authentication';
        }, function(reason) {
            this.replaceWith('authentication/signout-failed');
        });
    }

});
