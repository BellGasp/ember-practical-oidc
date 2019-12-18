import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { later, cancel } from '@ember/runloop';

export default Mixin.create({
  session: service(),

  silentRenew() {
    if (!this.get('session.silentRenewActive') && this.get('session.automaticSilentRenew')) {
      this.silentRenewInterval()
      this.set('session.silentRenewActive', true);
    }
  },
  silentRenewInterval() {
    let backgroundTask = later(this, function () {
      this.silentRenewInterval();
      this.get('session.userManager').signinSilent();
    }, this.get('session.checkSessionInterval'));
    this.set('session.backgroundTask', backgroundTask);
  },
  stopSilentRenew() {
    cancel(this.get('session.backgroundTask'));
    this.set('session.backgroundTask', null);
    this.set('session.silentRenewActive', false);
  },
});
