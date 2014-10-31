import Ember from 'ember';
import ErrorParserMixin from 'ember-cli-session/mixins/error-parser';

module('ErrorParserMixin');

// Replace this with your real tests.
test('it works', function() {
  var ErrorParserObject = Ember.Object.extend(ErrorParserMixin);
  var subject = ErrorParserObject.create();
  ok(subject);
});
