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

  init() {
    this._super(...arguments);

    if (OIDC.enableLogging) {
      Logger.info('OIDC Session Service: initializing');
    }

    this._setEssentialProperties();
    this._setOptionalProperties();
    this._setupUserManager();
  },

  authenticate(transition) {
    this.get('userManager').getUser().then(data => {
      if (!data || data.expired) {
        this.get('userManager').signinPopup().then(() => {
          this.set('isAuthenticated', true);
          if (transition) {
            transition.retry();
          }
        }, () => {
          this.set('isAuthenticated', false);
          this.get('routing').transitionTo('authentication-failure');
        });
      } else {
        this.set('isAuthenticated', true);
        this.set('profile', data.profile);
        if (transition) {
          transition.retry();
        }
      }
    });
  },

  routing: service('-routing'),

  profile: alias('userManager.profile'),

  roles: computed('userManager.profile.role', function () {
    let roles = this.get('userManager.profile.role');
    return Array.isArray(roles) ? Ember.A(roles) : Ember.A([roles]);
  }),

  _setEssentialProperties() {
    let isMissingEssentialInformation =
      !OIDC.applicationName ||
      !OIDC.applicationURL ||
      !OIDC.authenticationURL ||
      !OIDC.requestedScopes;

    if (isMissingEssentialInformation) {
      throw new Error('OIDC Session Service: Missing essential information, please ensure you have properly set `ENV.OIDC.applicationName`, `ENV.OIDC.applicationURL`, `ENV.OIDC.authenticationURL`, `ENV.OIDC.requestedScopes` in config.environment.js');
    }

    this.setProperties({
      applicationName: OIDC.applicationName,
      applicationURL: OIDC.applicationURL,
      authenticationURL: OIDC.authenticationURL,
      requestedScopes: OIDC.requestedScopes
    });
  },

  _setOptionalProperties() {
    // TODO
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
      post_logout_redirect_uri: `${this.get('localURL')}/${this.get('postLogoutRedirectURL')}`,
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
      beforeSend: (xhr) => {
        let userManager = this.get('userManager');
        if (userManager.access_userManager) {
          xhr.setRequestHeader('Authorization', `Bearer ${userManager.access_userManager}`);
        }
      }
    });
  }
});
