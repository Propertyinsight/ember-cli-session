import Ember from 'ember';
import DS from 'ember-data';
const {
  Mixin,
  typeOf
} = Ember;

export default Mixin.create({
  /// <param name="error">
  ///     DS.InvalidError
  ///     jqXHR
  ///     string
  ///     array of strings
  /// </param>
  /// <returns type="array" />
  getErrorMessages(error) {
    // When rejected after calling record.save().then(resolve, reject), it's easiest
    // to pass in the reason parameter as the error object for this function.
    // if server returns 422, then the reason parameter will be DS.InvalidError, otherwise, it will be jqXHR

    // When substate goes into error, easiest just to pass in the error substate model.
    // if server returns 422, then the model will be DS.InvalidError, otherwise, it will be jqXHR

    var fallbackMessages = ['There was an unexpected error.'];

    if (typeOf(error) === 'undefined') {
      return fallbackMessages;
    }

    if (typeOf(error) === 'null') {
      return fallbackMessages;
    }

    if (typeOf(error) === 'string') {
      return [error];
    }

    if (typeOf(error) === 'array') {
      return error;
    }

    // interestingly, DS.InvalidError contains all of the error messages, even for the attributes (e.g. base) that don't exist in the model.
    // DS.Errors, which is attached to the model as record.get('errors'), only contains the errors for the attributes that are on the model. http://stackoverflow.com/a/24031233/188740
    if (error instanceof DS.InvalidError) {
      return this._messagesFromObject(error.errors);
    }

    if (typeOf(error.responseJSON) === 'object' && typeOf(error.responseJSON.errors) === 'object'){
      return this._messagesFromObject(error.responseJSON.errors);
    }

    if (typeOf(error.jqXHR) === 'object' && typeOf(error.jqXHR.responseJSON) === 'object' && typeOf(error.jqXHR.responseJSON.errors) === 'object'){
      return this._messagesFromObject(error.jqXHR.responseJSON.errors);
    }

    if (typeOf(error.message) === 'string'){
      return [error.message];
    }

    return fallbackMessages;
  },

  _messagesFromObject(object) {
    /*jshint loopfunc: true */
    let messages = [];

    for (let key in object) {
      let value = object[key];
      if (typeOf(value) === 'array'){
        value.forEach(
          function(message) {
            messages.push(this._concatenateMessage(key, message));
          }.bind(this)
        );
      } else {
        messages.push(this._concatenateMessage(key, value));
      }
    }
    return messages;
  },

  _concatenateMessage(key, value) {
    if (key === 'base'){
      return value;
    } else {
      return this._titleize(key) + ' ' + value;
    }
  },

  _titleize(s) {
    return s.underscore().replace(/_/g, ' ').capitalize();
  }
});
