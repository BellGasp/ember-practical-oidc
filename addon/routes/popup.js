import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),

  async init() {
    this._super(...arguments);
    let session = this.get('session');
    if(session.usePopup)
    {
      await this.get('session.userManager').signinPopupCallback();
    } 
    else {
      await this.get('session.userManager').signinRedirectCallback();
      if(session.transitionToRedirect)
      await session.authenticate(this.transitionTo(session.transitionToRedirect));
    }
  }
});
