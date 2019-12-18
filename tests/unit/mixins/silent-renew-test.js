import EmberObject from '@ember/object';
import SilentRenewMixin from 'ember-practical-oidc/mixins/silent-renew';
import { module, test } from 'qunit';

module('Unit | Mixin | SilentRenew', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let SilentRenewObject = EmberObject.extend(SilentRenewMixin);
    let subject = SilentRenewObject.create();
    assert.ok(subject);
  });
});
