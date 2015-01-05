'use strict';

/**
 * @ngdoc function
 * @name makeawesomespeechesApp.controller:EditorsCtrl
 * @description
 * # EditorsCtrl
 * Controller of the makeawesomespeechesApp
 */
angular.module('makeawesomespeechesApp')
  .controller('EditorsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
