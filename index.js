/* eslint-env node */
'use strict';

const FastbootTransform = require('fastboot-transform');

module.exports = {

  name: 'ember-practical-oidc',

  options: {
    nodeAssets: {
      'oidc-client': {
        vendor: {
          srcDir: 'dist',
          include: ['oidc-client.js'],
          processTree(input) {
            return FastbootTransform(input);
          }
        }
      }
    }
  },

  included() {
    this._super.included.apply(this, arguments);
    this._ensureThisImport();

    this.import('vendor/oidc-client/oidc-client.js');
    this.import('vendor/shims/oidc-client.js', {
      exports: {
        'oidc-client': ['default', 'UserManager']
      }
    });
  },

  _ensureThisImport() {
    if (!this.import) {
      this._findHost = function findHostShim() {
        let current = this;
        let app;

        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
        return app;
      };
      this.import = function importShim(asset, options) {
        let app = this._findHost();
        app.import(asset, options);
      };
    }
  }

};
