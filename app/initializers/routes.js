import Router from '../router';
import Ember from 'ember';
import Configuration from 'ember-get-config';

const { OIDC } = Configuration;

export function initialize() {
  if (!OIDC) {
    /* eslint-disable-next-line no-console */
    console.warn('Practical OIDC :: Routes Initializer: No OIDC configuration found ' +
      '-- Skipping routes initialization.');
  }

  const configuration = OIDC || { initializeRoutes: false, enableLogging: false };

  if (configuration.initializeRoutes && !Ember.testing) {
    Router.map(function () {
      this.route('popup');
      this.route('renew');
    });

    if (configuration.enableLogging) {
      /* eslint-disable-next-line no-console */
      console.info('Practical OIDC :: Routes Initializer: Routes (popup + renew) have been ' +
        'initialized.');
    }
  } else {
    if (configuration.enableLogging) {
      /* eslint-disable-next-line no-console */
      console.info('Practical OIDC :: Routes Initializer: Route initialization has been skipped.');
    }
  }
}

export default {
  name: 'routes',
  initialize
};
