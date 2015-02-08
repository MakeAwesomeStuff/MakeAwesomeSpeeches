'use strict';

/**
 * @ngdoc overview
 * @name makeawesomespeechesApp
 * @description
 * # makeawesomespeechesApp
 *
 * Main module of the application.
 */
angular
  .module('makeawesomespeechesApp', [
    'makeawesomespeeches.config',
    'ngRoute',
    'textAngular',
    'firebase.utils',
    'loginHandler',
    'makeawesomespeechesApp.routes'
  ]);

// Separated it out to work with the authRequired
// This is how it was done in angularFire-seed
// Note loginHandler.js in angularFire-seed is simpleLogin.js
angular.module('makeawesomespeechesApp.routes', ['ngRoute', 'loginHandler'])
  .constant('ROUTES', {
      '/': {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        authRequired: true
      },
      '/about': {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      },
      '/editors': {
        templateUrl: 'views/editors.html',
        controller: 'EditorsCtrl'
      },
      '/account': {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        authRequired: true
      },
      '/welcome': {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl'
      }
      // otherwise done in method below
  })

  /**
   * Adds a special `whenAuthenticated` method onto $routeProvider. This special method,
   * when called, invokes the requireUser() service (see loginHandler.js).
   *
   * The promise either resolves to the authenticated user object and makes it available to
   * dependency injection (see AuthCtrl), or rejects the promise if user is not logged in,
   * forcing a redirect to the /login page
   */
  .config(['$routeProvider', function($routeProvider) {
    // credits for this idea: https://groups.google.com/forum/#!msg/angular/dPr9BpIZID0/MgWVluo_Tg8J
    // unfortunately, a decorator cannot be use here because they are not applied until after
    // the .config calls resolve, so they can't be used during route configuration, so we have
    // to hack it directly onto the $routeProvider object
    $routeProvider.whenAuthenticated = function(path, route) {
      route.resolve = route.resolve || {};
      route.resolve.user = ['requireUser', function(requireUser) {
        return requireUser();
      }];
      $routeProvider.when(path, route);
    };
  }])

  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$routeProvider', 'ROUTES', function($routeProvider, ROUTES) {
    angular.forEach(ROUTES, function(route, path) {
      if( route.authRequired ) {
        // adds a {resolve: user: {...}} promise which is rejected if
        // the user is not authenticated or fulfills with the user object
        // on success (the user object is then available to dependency injection)
        $routeProvider.whenAuthenticated(path, route);
      }
      else {
        // all other routes are added normally
        $routeProvider.when(path, route);
      }
    });
    // routes which are not in our map are redirected to /
    $routeProvider.otherwise({redirectTo: '/welcome'});
  }])

  /**
   * Apply some route security. Any route's resolve method can reject the promise with
   * { authRequired: true } to force a redirect. This method enforces that and also watches
   * for changes in auth status which might require us to navigate away from a path
   * that we can no longer view.
   */
  .run(['$rootScope', '$location', 'loginHandler', 'ROUTES', 'loginRedirectPath',
    function($rootScope, $location, loginHandler, ROUTES, loginRedirectPath) {
      function check(user) {
        // used by the changeEmail functionality so the user
        // isn't redirected to the login screen while we switch
        // out the accounts (see changeEmail.js)
        if( $rootScope.authChangeInProgress ) { return; }
        if( !user && authRequired($location.path()) ) {
          $location.path(loginRedirectPath);
        }
      }

      function authRequired(path) {
        return ROUTES.hasOwnProperty(path) && ROUTES[path].authRequired;
      }

      // watch for login status changes and redirect if appropriate
      loginHandler.watch(check, $rootScope);

      // some of our routes may reject resolve promises with the special {authRequired: true} error
      // this redirects to the login page whenever that is encountered
      $rootScope.$on('$routeChangeError', function(e, next, prev, err) {
        if( angular.isObject(err) && err.authRequired ) {
          $location.path(loginRedirectPath);
        }
      });
    }
  ]);
