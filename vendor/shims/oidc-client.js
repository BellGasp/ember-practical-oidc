(function() {
  function vendorModule() {
    'use strict';

    return { 'UserManager': UserManager };
  }

  define('oidc-client', [], vendorModule);
})();
