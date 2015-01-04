'use strict';

/**
 * @ngdoc function
 * @name makeawesomespeechesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the makeawesomespeechesApp
 */
angular.module('makeawesomespeechesApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
