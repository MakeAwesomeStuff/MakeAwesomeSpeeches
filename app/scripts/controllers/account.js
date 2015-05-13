'use strict';

/**
 * @ngdoc function
 * @name makeawesomespeechesApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the makeawesomespeechesApp
 */
angular.module('makeawesomespeechesApp')
  .controller('AccountCtrl', ['$scope', '$location', '$routeParams', 'fbutil', 'user',
                    function ($scope, $location, $routeParams, fbutil, user) {

    $scope.speechlength = '';

    function setActiveSpeechListItem(storyKey) {
      if ($scope.isCurrentSpeechLoaded && $scope.isSpeechListLoaded) {
        if (!storyKey) {
          storyKey = $scope.currentSpeech.$id;
        }
        if ($scope.speechList) {
          // We want to know which one of the speechlist this is
          for (var i=0, len=$scope.speechList.length; i<len; i++) {
            if ($scope.speechList[i].key === storyKey) {
              $scope.activeSpeechListItem = $scope.speechList[i];
              $scope.activeSpeechListItemIndex = i;
              break;
            }
          }
        }
      }
    }

    $scope.syncLatestSpeech = function() {
      var storyKey = $scope.speechList[$scope.speechList.length-1].key;
      $scope.syncSpeech(storyKey);
    };

    var div = document.createElement('div');
    function stripHtml(s) {
      s = s.replace(/<br\/>/gi, ' '); // Breaks should be a space
      s = s.replace(/&nbsp;/gi,' '); // exclude html spaces
      s = s.replace(/&#160;/gi,' '); // exclude html spaces
      s = s.replace(/<p>/gi,' '); // exclude html spaces
      s = s.replace(/<\/p>/gi,' '); // exclude html spaces
      div.innerHTML = s;
      return div.textContent || div.innerText || '';
    }

    function countWords(s){
        s = stripHtml(s);
        s = s.replace(/(^\s*)|(\s*$)/gi,''); //exclude  start and end white-space
        s = s.replace(/\s{2,}/g, ' ');//2 or more space to 1
        s = s.replace(/\n /,'\n'); // exclude newline with a start spacing
        return s.split(' ').length;
    }

    var wordsPerMinute = 130;
    $scope.syncSpeech = function(storyKey) {
      $scope.isCurrentSpeechLoaded = false;
      if ($scope.syncedObject) {
        // Otherwise we overwrite the previous one if not a hard refresh
        $scope.syncedObject.$destroy();
      }
      $scope.syncedObject = fbutil.syncObject('speeches/'+user.uid+'/'+storyKey);
      $scope.syncedObject.$bindTo($scope, 'currentSpeech').then(function () {
        $scope.isCurrentSpeechLoaded = true;
        setActiveSpeechListItem();
        $scope.$watch('currentSpeech.content', function() {
          var numWords = countWords($scope.currentSpeech.content);
          var lengthInMinutes = numWords/wordsPerMinute;
          if (lengthInMinutes < 2) {
            $scope.speechlength = '';
          } else {
            $scope.speechlength = 'This speech is ' + Math.round(numWords/wordsPerMinute) + 'ish minutes long';
          }
        });
      });
    };

    $scope.createSpeech = function() {
      var newSpeech = {
        content: 'Brand new speech! CLICK HERE AND EDIT ME :)',
        createdOn: new Date().toJSON(),
        title: 'Speech ' + ($scope.speechList.length+1)
      };
      fbutil.pushObject('speeches/'+user.uid, newSpeech).then(function(ref) {
        var newSpeechListItem = {
            createdOn: newSpeech.createdOn,
            key: ref.key(),
            title: newSpeech.title
        };
        $scope.speechList.$add(newSpeechListItem).then(function() {
          $scope.syncLatestSpeech();
        });
      });
    };

    $scope.titleUpdated = function() {
      if ($scope.activeSpeechListItem && $scope.currentSpeech) {
        $scope.activeSpeechListItem.title = $scope.currentSpeech.title;
        $scope.speechList.$save($scope.activeSpeechListItemIndex);
      }
    };

    $scope.user = user;
    $scope.isCurrentSpeechLoaded = false;
    $scope.isSpeechListLoaded = false;
    // Determine wether we show the latest, or a specific story
    var needToLoadLatestSpeech = true;
    if ($routeParams.speechId) {
      needToLoadLatestSpeech = false;
      $scope.syncSpeech($routeParams.speechId);
    }

    // Get list of stories and use that to find the latest
    // Note: Remember not to use push(), splice(), etc on this 'array'
    $scope.isSpeechListLoaded = false;
    $scope.speechList = fbutil.syncArray('userSpeechesList/'+user.uid);
    $scope.speechList.$loaded(function() {
      $scope.isSpeechListLoaded = true;
      if ($scope.speechList.length === 0) {
        $scope.createSpeech();
      } else if (needToLoadLatestSpeech) {
        $scope.syncLatestSpeech();
      }
      setActiveSpeechListItem();
    });

  }]);
