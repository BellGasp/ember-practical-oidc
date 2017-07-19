import Router from '../router';
import Ember from 'ember';
import config from 'ember-get-config';

const { Logger } = Ember;
const { OIDC } = config;

export function initialize() {
  if (OIDC.initializeRoutes) {
    Router.map(function () {
      this.route('popup');
      this.route('renew');
    });

    if (OIDC.enableLogging) {
      Logger.info('OIDC Routes Initializer: Routes (popup + renew) have been initialized.');
    }
  } else {
    if (OIDC.enableLogging) {
      Logger.info('OIDC Routes Initializer: Route initialization has been skipped.');
    }
  }
}

export default {
  name: 'routes',
  initialize
};
