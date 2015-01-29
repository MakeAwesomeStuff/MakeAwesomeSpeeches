'use strict';

/**
 * @ngdoc function
 * @name makeawesomespeechesApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the makeawesomespeechesApp
 */
angular.module('makeawesomespeechesApp')
  .controller('WelcomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
