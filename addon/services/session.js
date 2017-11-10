import Ember from 'ember';
import config from 'ember-get-config';
import Oidc from 'npm:oidc-client';

const { Service, Logger, Error, inject: { service }, computed, computed: { alias } } = Ember;
const { OIDC } = config;

export default Service.extend({
  userManager: null,
  isAuthenticated: false,

  applicationName: null,
  applicationURL: null,
  authenticationURL: null,
  requestedScopes: null,

  popupRedirectURL: 'popup',
  silentRedirectURL: 'renew',
  responseType: 'id_token token',
  postLogoutRedirectURL: '',
  checkSessionInterval: 30000,
  automaticSilentRenew: false,
  filterProtocolClaims: true,
  loadUserInfo: true,

  localURL: computed(function () {
    return this.get('routing.router.location.location.origin');
  }),

  init() {
    this._super(...arguments);

    if (!OIDC && !Ember.testing) {
      throw new Error('OIDC Session Service: Missing the OIDC configuration object. Please ' +
        'ensure you have properly declared the `ENV.OIDC` object.');
    }

    if (OIDC && OIDC.enableLogging) {
      Logger.info('Practical OIDC :: Session Service: Initializing');
    }

    if (OIDC) {
      this._setEssentialProperties();
      this._setOptionalProperties();
    }

    this._setupUserManager();
  },

  authenticate(transition) {
    this.get('userManager').getUser().then(data => {
      if (!data || data.expired) {
        this.get('userManager').signinPopup().then(result => {
          this.setProperties({ isAuthenticated: true, userSession: result });
          if (transition) {
            transition.retry();
          }
        }, (error) => {
          this.set('isAuthenticated', false);

          if (error.message === 'Popup window closed') {
            // The popup window was closed, we try and redirect to the specified route
            if (OIDC.failedLoginRoute && typeof OIDC.failedLoginRoute === 'string') {
              if (OIDC.enableLogging) {
                Logger.info('Practical OIDC :: Session Service: Attempting to redirect the ' +
                  `specified failed login route: ${OIDC.failedLoginRoute}.`);
              }

              this.get('routing').transitionTo(OIDC.failedLoginRoute);
            } else {
              Logger.warn('Practical OIDC :: Session Service: There were no ' +
                '`ENV.OIDC.failedLoginRoute` property specified in the `config/environment.js` ' +
                'file. No automatic redirection will be attempted at this time.');
            }
          } else {
            throw error;
          }
        });
      } else {
        this.setProperties({ isAuthenticated: true, userSession: data });

        if (transition) {
          transition.retry();
        }
      }
    });
  },

  routing: service('-routing'),

  userSession: null,
  profile: alias('userSession.profile'),

  roles: computed('profile.role', function () {
    let roles = this.get('profile.role');
    return Array.isArray(roles) ? Ember.A(roles) : Ember.A([roles]);
  }),

  _setEssentialProperties() {
    const isMissingEssentialInformation =
      !OIDC.applicationName ||
      !OIDC.applicationURL ||
      !OIDC.authenticationURL ||
      !OIDC.requestedScopes;

    if (isMissingEssentialInformation) {
      throw new Error('OIDC Session Service: Missing essential information, please ensure you ' +
        'have properly set `ENV.OIDC.applicationName`, `ENV.OIDC.applicationURL`, ' +
        '`ENV.OIDC.authenticationURL`, `ENV.OIDC.requestedScopes` in config.environment.js');
    }

    this.setProperties({
      applicationName: OIDC.applicationName,
      applicationURL: OIDC.applicationURL,
      authenticationURL: OIDC.authenticationURL,
      requestedScopes: OIDC.requestedScopes
    });
  },

  _setOptionalProperties() {
    this._setOptionalProperty('popupRedirectURL', OIDC.popupRedirectURL, 'string');
    this._setOptionalProperty('silentRedirectURL', OIDC.silentRedirectURL, 'string');
    this._setOptionalProperty('responseType', OIDC.responseType, 'string');
    this._setOptionalProperty('postLogoutRedirectURL', OIDC.postLogoutRedirectURL
      || this.get('localURL'), 'string');
    this._setOptionalProperty('checkSessionInterval', OIDC.checkSessionInterval, 'number');
    this._setOptionalProperty('automaticSilentRenew', OIDC.automaticSilentRenew, 'boolean');
    this._setOptionalProperty('filterProtocolClaims', OIDC.filterProtocolClaims, 'boolean');
    this._setOptionalProperty('loadUserInfo', OIDC.loadUserInfo, 'boolean');
  },

  _setOptionalProperty(propertyName, propertyValue, propertyType) {
    if (propertyValue) {
      if (typeof propertyValue === propertyType) {
        this._logOptionalPropertyOverride(propertyName, propertyValue);
        this.set(`${propertyName}`, propertyValue);
      } else {
        this._throwOptionalPropertyError(`ENV.OIDC.${propertyName}`);
      }
    }
  },

  _logOptionalPropertyOverride(propertyName, propertyValue) {
    Logger.info('Practical OIDC :: Session Service: Overriding the default value for the ' +
      `${propertyName}  to: ${propertyValue}.`);
  },

  _throwOptionalPropertyError(propertyKey) {
    throw new Error('Practical OIDC :: Session Service: Please ensure you have properly set ' +
      `\`${propertyKey}\` in config.environment.js`);
  },

  _setupUserManager() {
    let userManager = new Oidc.UserManager({
      authority: this.get('authenticationURL'),
      client_id: this.get('applicationName'),
      popup_redirect_uri: `${this.get('applicationURL')}/${this.get('popupRedirectURL')}`,
      automaticSilentRenew: this.get('automaticSilentRenew'),
      silent_redirect_uri: `${this.get('localURL')}/${this.get('silentRedirectURL')}`,
      checkSessionInterval: this.get('checkSessionInterval'),
      response_type: this.get('responseType'),
      scope: this.get('requestedScopes'),
      post_logout_redirect_uri: `${this.get('postLogoutRedirectURL')}`,
      filter_protocol_claims: this.get('filterProtocolClaims'),
      loadUserInfo: this.get('loadUserInfo')
    });

    this.set('userManager', userManager);

    userManager.events.addUserLoaded(() => {
      userManager.getUser().then(data => {
        if (data) {
          this.set('isAuthenticated', true);
        }
      });
    });

    $.ajaxSetup({
      beforeSend: (xhr, settings) => {
        let accessToken = this.get('userSession.access_token');
        if (accessToken && !settings.ignoreAuthorizationHeader) {
          xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        }
      }
    });
  }
});
