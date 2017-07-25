# Ember Practical OIDC

[![npm version](https://badge.fury.io/js/ember-practical-oidc.svg)](https://badge.fury.io/js/ember-practical-oidc)
[![Ember Observer Score](https://emberobserver.com/badges/ember-practical-oidc.svg)](https://emberobserver.com/addons/ember-practical-oidc)
[![Build Status](https://travis-ci.org/BellGasp/ember-practical-oidc.svg?branch=master)](https://travis-ci.org/BellGasp/ember-practical-oidc)
[![Code Climate](https://codeclimate.com/github/BellGasp/ember-practical-oidc/badges/gpa.svg)](https://codeclimate.com/github/BellGasp/ember-practical-oidc)

## Installation

Like most ember addons, simply run `ember install ember-practical-oidc` and you should be all set as far as installation goes.

## Configuration

### Mandatory Configuration

#### environment.js
Here's the mandatory information you'll have to supply the addon using the `config/environment.js` file of your application. Without these four properties, it's impossible to construct a valid authentication payload.

```js
ENV.OIDC = {
  applicationName: '<YOUR APP NAME>',
  applicationURL: '<YOUR APP URL>',
  authenticationURL: '<YOUR AUTHENTICATION ENDPOINT>',
  requestedScopes: '<THE REQUESTED SCOPES>'
};
```

#### package.json
It is also currently mandatory that you include `ember-browserify` and `oidc-client` in your `package.json` file. This is due to an existing limitation when using `ember-browserify` in Ember Addons.

`ember install ember-browserify && npm install --save-dev oidc-client`

### Optional Configuration

Here are the additional configuration parameters that are available.

| Property Key | Default Value | Type |
|---|:-------------:|:------:|
| popupRedirectURL | "popup" | string |
| silentRedirectURL | "renew" | string |
| responseType | "id_token token" | string |
| postLogoutRedirectURL | "" | string |
| checkSessionInterval | 30000 | int |
| automaticSilentRenew | false | boolean |
| filterProtocolClaims | true | boolean |
| loadUserInfo | true | boolean |

### Route Initialization Configuration

The addon is able to automatically create the `renew` and `popup` routes for you. If that's what you want, simply set the `ENV.OIDC.initializeRoutes` environmnet variable to `true` in your `config/environment.js` file.

### Debug Configuration

It's possible to view logging information by setting the `ENV.OIDC.enableLogging` environment variable to `true`.
