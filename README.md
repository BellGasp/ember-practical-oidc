# Ember Practical OIDC

## Installation

Like most ember addons, simply run `ember install ember-practical-oidc` and you should be all set as far as installation goes.

## Configuration

### Mandatory Configuration
Here's the mandatory information you'll have to supply the addon using the `config/environment.js` file of your application. Without these four properties, it's impossible to construct a valid authentication payload.

```js
ENV.OIDC = {
  applicationName: '<YOUR APP NAME>',
  applicationURL: '<YOUR APP URL>',
  authenticationURL: '<YOUR AUTHENTICATION ENDPOINT>',
  requestedScopes: '<THE REQUESTED SCOPES>'
};
```

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
