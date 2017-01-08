/* eslint-env node, jasmine */
/* global inject module:true */

'use strict';

describe('controller : edaStepWayEasyFormGenController', () => {

  beforeEach(() => angular.mock.module('eda.easyformGen.stepway'));
  let $rootScope;
  let $scope;
  let $controller;

  beforeEach(inject((_$rootScope_, _$controller_) => {
    $rootScope  = _$rootScope_;
    $scope      = $rootScope.$new();
    $controller = _$controller_;
    $controller('edaStepWayEasyFormGenController', {'$scope': $scope});
  }));

  describe('tests', () => {
   it('should have tests', inject(() => {
      expect(1).toEqual(1);
    }));
  });

  
});
