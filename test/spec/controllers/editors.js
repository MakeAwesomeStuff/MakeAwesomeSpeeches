'use strict';

describe('Controller: EditorsCtrl', function () {

  // load the controller's module
  beforeEach(module('makeawesomespeechesApp'));

  var EditorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditorsCtrl = $controller('EditorsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
