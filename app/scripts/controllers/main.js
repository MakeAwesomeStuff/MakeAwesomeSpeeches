'use strict';

/**
 * @ngdoc function
 * @name makeawesomespeechesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the makeawesomespeechesApp
 */
angular.module('makeawesomespeechesApp')
  .controller('MainCtrl', ['$scope', 'fbutil', function($scope, fbutil) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  // download the data into a local object
  var syncObject = fbutil.syncObject('speech');
  // synchronize the object with a three-way data binding
  syncObject.$bindTo($scope, 'speech');

  }]);
