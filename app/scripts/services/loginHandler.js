'use strict';

angular.module('loginHandler', ['firebase', 'firebase.utils'])

  // a simple wrapper on simpleLogin.getUser() that rejects the promise
  // if the user does not exists (i.e. makes user required)
  .factory('requireUser', ['loginHandler', '$q', function(simpleLogin, $q) {
    return function() {
      return simpleLogin.getUser().then(function (user) {
        return user ? user : $q.reject({ authRequired: true });
      });
    };
  }])

  .factory('loginHandler', ['$firebaseAuth', 'fbutil',
    function($firebaseAuth, fbutil) {
      var auth = $firebaseAuth(fbutil.ref());
      var listeners = [];

      function statusChange() {
        fns.user = auth.$getAuth();
        angular.forEach(listeners, function(fn) {
          fn(fns.user);
        });
      }

      var fns = {
        user: null,

        getUser: function() {
          return auth.$waitForAuth();
        },

        /**
         * @param {string} email
         * @param {string} pass
         * @returns {*}
         */
        login: function() {
          return auth.$authWithOAuthPopup('facebook').then(function(authData) {
              console.log('Logged in as:', authData.uid);
            }).catch(function(error) {
              console.error('Authentication failed: ', error);
            });
        },

        logout: function() {
          auth.$unauth();
        },

        watch: function(cb, $scope) {
          fns.getUser().then(function(user) {
            cb(user);
          });
          listeners.push(cb);
          var unbind = function() {
            var i = listeners.indexOf(cb);
            if( i > -1 ) { listeners.splice(i, 1); }
          };
          if( $scope ) {
            $scope.$on('$destroy', unbind);
          }
          return unbind;
        }
      };

      auth.$onAuth(statusChange);
      statusChange();

      return fns;
    }]);
