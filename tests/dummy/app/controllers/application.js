import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),

  actions: {
    logout() {
      this.set('session.isAuthenticated', false);
      this.get('session.userManager').signoutRedirect();
    }
  }

});
