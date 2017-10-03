(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': Oidc,
      'UserManager': Oidc.UserManager
    };
  }

  define('oidc-client', [], vendorModule);
})();
