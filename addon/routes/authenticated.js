import AuthenticationMixin from '../mixins/authentication';
import Route from '@ember/routing/route';

export default Route.extend(AuthenticationMixin, {
  beforeModel(transition) {
    return this.authenticate(transition);
  }
});
