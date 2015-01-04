'use strict';

/**
 * @ngdoc function
 * @name makeawesomespeechesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the makeawesomespeechesApp
 */
angular.module('makeawesomespeechesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
