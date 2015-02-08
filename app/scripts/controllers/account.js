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

    $scope.newSpeech = function() {
      var newSpeech = {};
      newSpeech.createdOn = new Date().toJSON();
      newSpeech.content = 'Write your new speech here :)';

      // Push directly onto the object
      var key = fbutil.pushObject('speeches/'+user.uid, newSpeech);
      // console.log('key:', key);
      // Need to add to speeches list
      var newSpeechListItem = {};
      newSpeechListItem.key = key;
      newSpeechListItem.createdOn = newSpeech.createdOn;
      fbutil.pushObject('userSpeechesList/'+user.uid, newSpeechListItem);
    };
  }]);
