'use strict';

// Declare app level module which depends on filters, and services
angular.module('makeawesomespeeches.config', [])

  // version of this seed app is compatible with angularFire 0.6
  // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
  // .constant('version', '0.8.2')

  // where to redirect users if they need to authenticate (see routeSecurity.js)
  .constant('loginRedirectPath', '/welcome')

  // your Firebase data URL goes here, no trailing slash
  .constant('FBURL', 'https://ma-speeches.firebaseio.com');
