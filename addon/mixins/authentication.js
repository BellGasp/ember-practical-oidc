import Ember from 'ember';

const { Mixin, inject: { service } } = Ember;

export default Mixin.create({
  session: service(),

  authenticate(transition) {
    if (!this.get('session').isAuthenticated) {
      this.get('session').authenticate(transition);
      transition.abort();
    }
  }
});
