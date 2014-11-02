import Ember from 'ember';
import ajax from 'ic-ajax';
import config from '../../config/environment';

export default Ember.Route.extend({

	beforeModel: function(transition) {
		return ajax({
			type: 'PUT',
			url: '/' + this.get('session-config.apiNamespace') + '/authentication/signout'
		}).then(function(response) {
		    window.location.href = this.get('session-config.baseURL') + 'authentication';
		}, function(reason) {
			this.replaceWith('authentication/signout-failed');
		});
	}

});
