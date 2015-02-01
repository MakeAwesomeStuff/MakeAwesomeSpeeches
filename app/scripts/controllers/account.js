'use strict';

/**
 * @ngdoc function
 * @name makeawesomespeechesApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the makeawesomespeechesApp
 */
angular.module('makeawesomespeechesApp')
  .controller('AccountCtrl', ['$scope', 'fbutil', 'user',
                    function ($scope, fbutil, user) {
    $scope.user = user;
    // download the data into a local object
    var syncObject = fbutil.syncObject('speeches/'+user.uid+'/firstspeechid');
    // synchronize the object with a three-way data binding
    syncObject.$bindTo($scope, 'currentSpeech');
  }]);
