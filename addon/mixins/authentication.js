import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  session: service(),

  authenticate(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.get('session').authenticate(transition);
      transition.abort();
    }
  }
});
