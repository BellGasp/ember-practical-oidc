import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  session: service(),

  init() {
    this._super(...arguments);

    this.get('session.userManager').signinSilentCallback()
  }
});
