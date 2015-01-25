'use strict';

/**
 * @ngdoc function
 * @name makeawesomespeechesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the makeawesomespeechesApp
 */
angular.module('makeawesomespeechesApp')
  .controller('MainCtrl', ['$scope', '$location', 'fbutil', 'loginHandler', function($scope, $location, fbutil, loginHandler) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  // download the data into a local object
  var syncObject = fbutil.syncObject('speech');
  // synchronize the object with a three-way data binding
  syncObject.$bindTo($scope, 'speech');

  // Does this work? it should come in through as an argument
  $scope.user = loginHandler.getUser();

  $scope.login = function() {
    loginHandler.login().then(function(){
      $location.path('/account');
    });
  };

  $scope.getUser = function() {
    $scope.user = loginHandler.getUser().then(function(user) {
      $scope.user = user;
    });
  };

  }]);
