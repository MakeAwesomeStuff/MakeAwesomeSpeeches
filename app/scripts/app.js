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
    'ngRoute'
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
      .otherwise({
        redirectTo: '/'
      });
  });
