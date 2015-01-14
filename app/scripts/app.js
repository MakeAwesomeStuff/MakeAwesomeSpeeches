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
    'firebase.utils'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/editors', {
        templateUrl: 'views/editors.html',
        controller: 'EditorsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
