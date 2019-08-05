import Route from '@ember/routing/route';
import AuthenticationMixin from 'ember-practical-oidc/mixins/authentication';

export default Route.extend(AuthenticationMixin, {
  beforeModel(transition) {
    return this.authenticate(transition);
  }
});
