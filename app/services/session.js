import Ember from 'ember';
import GlobalAlert from '../models/global-alert';

export default Ember.Object.extend({

    init: function() {
        this.globalAlert = GlobalAlert.create();
    },

    globalAlert: null,

    user: null,  

    transitionOnSignIn: null,

    tryTransitionOnSignIn: function() {
        if (!this.get('transitionOnSignIn'))
            return false;

        this.get('transitionOnSignIn').retry();
        this.set('transitionOnSignIn', null);
        return true;
    },

    
    showGlobalAlert: function(messages, duration, type) {
        ///<param name="message">Can accept string to show one message, array of strings to show multiple messages, or DS.Errors object format (http://emberjs.com/api/data/classes/DS.Errors.html) {errors:{summary:['message1', 'message2']}}</param>
        ///<param name="duration" type="numeric">Duration to show alert in ms. falsy for indefinite. Default is falsy.</param>
        ///<param name="type" type="string">success, info, warning, danger. Default is info.</param>

        this.globalAlert.show(messages, duration, type);
    }

});
