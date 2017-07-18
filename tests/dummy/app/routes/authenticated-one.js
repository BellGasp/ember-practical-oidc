import Ember from 'ember';
import AuthenticationMixin from 'ember-practical-oidc/mixins/authentication';

const { Route } = Ember;

export default Route.extend(AuthenticationMixin, {
  beforeModel(transition) {
    return this.authenticate(transition);
  }
});
