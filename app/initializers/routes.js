import Router from '../router';
import Ember from 'ember';
import config from 'ember-get-config';

const { Logger } = Ember;
const { OIDC } = config;

export function initialize() {
  if (!OIDC) {
    Ember.Logger.warn('Practical OIDC :: Routes Initializer: No OIDC configuration found ' +
      '-- Skipping routes initialization.');
  }

  let configs = OIDC || { initializeRoutes: false, enableLogging: false };

  if (configs.initializeRoutes && !Ember.testing) {
    Router.map(function () {
      this.route('popup');
      this.route('renew');
    });

    if (configs.enableLogging) {
      Logger.info('Practical OIDC :: Routes Initializer: Routes (popup + renew) have been ' +
        'initialized.');
    }
  } else {
    if (configs.enableLogging) {
      Logger.info('Practical OIDC :: Routes Initializer: Route initialization has been skipped.');
    }
  }
}

export default {
  name: 'routes',
  initialize
};
