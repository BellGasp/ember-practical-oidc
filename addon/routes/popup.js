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
      {
        let transition = session.transitionToRedirect;
        if(session.useInPlaceRedirect){
          let lS = window.localStorage;
          let transitionUrl = lS.getItem(`${session.applicationName}-redirectTo`);
          if(transitionUrl &&
            session.transitionExceptionList.indexOf(transitionUrl) === -1){
            transition = transitionUrl
          }
        }
        await session.authenticate(this.transitionTo(transition));
      }
    }
  }
});
