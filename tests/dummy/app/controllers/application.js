import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  session: service(),

  actions: {
    logout() {
      this.set('session.isAuthenticated', false);
      this.get('session.userManager').signoutRedirect();
    }
  }

});
