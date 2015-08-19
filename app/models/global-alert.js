import Ember from 'ember';
import DS from 'ember-data';
import ErrorParser from '../mixins/error-parser';
const { run } = Ember;

export default Ember.Object.extend(ErrorParser, {
  _deactivateTimer: null,

  active: false,
  messages: [],
  type: 'info',

  show(messages, duration, type) {
    // if this is called directly from records.save() reject,
    // then if the server returns 422, then messages will be an instance of DS.InvalidError,
    // otherwise, it will be a jqXHR object

    if (this.get('_deactivateTimer')) {
      run.cancel(this.get('_deactivateTimer'));
    }

    this.set('messages', this.getErrorMessages(messages));

    this.setProperties({
      type: type || 'danger',
      active: true
    });

    if (!duration){
      return;
    }

    this.set('_deactivateTimer',
      run.later( ()=> {
        this.hide();
      }, duration)
    );
  },

  hide() {
    this.setProperties({
      messages: [],
      active: false
    });
  }
});
