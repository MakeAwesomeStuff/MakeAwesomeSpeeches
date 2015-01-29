'use strict';

/**
 * @ngdoc function
 * @name makeawesomespeechesApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the makeawesomespeechesApp
 */
angular.module('makeawesomespeechesApp')
  .controller('WelcomeCtrl', ['$scope', '$location', 'loginHandler', function ($scope, $location, loginHandler) {

    $scope.login = function() {
      loginHandler.login().then(function(){
        $location.path('/account');
      });
    };
  }]);
