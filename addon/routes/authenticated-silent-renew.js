import AuthenticationMixin from '../mixins/authentication';
import SilentRenewMixin from '../mixins/silent-renew';
import Route from '@ember/routing/route';

export default Route.extend(AuthenticationMixin, SilentRenewMixin, {
  beforeModel(transition) {
    this.silentRenew();
    return this.authenticate(transition);
  },
  resetController(controller, isExiting) {
    if (isExiting) {
      this.stopSilentRenew();
    }
  }
});
