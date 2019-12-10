import EmberObject from '@ember/object';
import AuthenticationMixin from 'ember-practical-oidc/mixins/authentication';
import { module, test } from 'qunit';

module('Unit | Mixin | Authentication');

// Replace this with your real tests.
test('it works', function (assert) {
  let AuthenticationObject = EmberObject.extend(AuthenticationMixin);
  let subject = AuthenticationObject.create();
  assert.ok(subject);
});
