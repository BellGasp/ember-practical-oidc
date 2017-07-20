/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'dummy',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.OIDC = {
      enableLogging: true,
      initializeRoutes: true,
      applicationName: process.env.OIDC_APP_NAME,
      applicationURL: process.env.OIDC_APP_URL,
      authenticationURL: process.env.OIDC_AUTH_URL,
      requestedScopes: process.env.OIDC_SCOPES
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV.OIDC = {
      enableLogging: true,
      initializeRoutes: true,
      applicationName: 'fake-app',
      applicationURL: 'www.the-most-awesome-application.com',
      authenticationURL: 'www.sweet-endpoint-bro.com',
      requestedScopes: 'roles'
    };
  }

  if (environment === 'production') {

  }

  return ENV;
};
