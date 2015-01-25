'use strict';

/**
 * @ngdoc function
 * @name makeawesomespeechesApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the makeawesomespeechesApp
 */
angular.module('makeawesomespeechesApp')
  .controller('AccountCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
