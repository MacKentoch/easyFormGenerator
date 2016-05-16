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

  describe('Check easyFormGeneratorVERSION', () => {
   it('should be provided a version from app.value', inject((easyFormGenVersion) => {
      expect(easyFormGenVersion).toEqual($scope.easyFormGeneratorVERSION);
    }));
  });

  describe('line control - step 0', () =>{
    describe('setActiveLineNumber(2) — when $scope.configuration.lines.length = 3', () => {
      it('should equal 2', () => {
        //mock countConfigurationModelLines() called by setActiveLineNumber()
        spyOn($scope, 'countConfigurationModelLines').and.callFake(() => 3);
        $scope.setActiveLineNumber(2);
        expect($scope.configuration.activeLine).toEqual(2);
      });
    });

    describe('setActiveLineNumber(2)  — when $scope.configuration.lines.length = 1', () => {
      it('should equal 1', () => {
        //mock countConfigurationModelLines() called by setActiveLineNumber()
        spyOn($scope, 'countConfigurationModelLines').and.callFake(() => 1);
        $scope.setActiveLineNumber(2);
        expect($scope.configuration.activeLine).toEqual(1);
      });
    });

    describe('addNewLine', () => {
      //reset scope.configuation before each
      //inject formFieldManage service to initialize configuration model
      beforeEach(inject((_formFieldManage_) => {
        var formFieldManage = _formFieldManage_;
        $scope.configuration = {};
        formFieldManage.initConfigurationEditFromScratch($scope.configuration);
      }));
      //test case configuration model has not been initialized
      it('should have no line', () =>{
        $scope.configuration = {};
        expect($scope.configuration.lines).toBeUndefined();
      });
      it('should have 1 line', () => {
          expect($scope.configuration.lines.length).toEqual(1);
      });
      it('should have 2 line', () => {
          $scope.addNewline();
          expect($scope.configuration.lines.length).toEqual(2);
      });
    });

    describe('removeThisLine', () => {
      //reset scope.configuation before each
      //inject formFieldManage service to initialize configuration model
      beforeEach(inject((_formFieldManage_) => {
        const formFieldManage   = _formFieldManage_;
        $scope.configuration  = {};
        formFieldManage.initConfigurationEditFromScratch($scope.configuration);
      }));
      it('should not remove last line', () => {
       $scope.removeThisLine();
        expect($scope.configuration.lines.length).toEqual(1);
      });
      it('should have 2 lines left (had 3 lines - removed at index 0)', () => {
        $scope.addNewline();
        $scope.addNewline();
        $scope.removeThisLine(0);
        expect($scope.configuration.lines.length).toEqual(2);
      });
      it('should still have 3 lines (index to remove > max index)', () => {
        $scope.addNewline();
        $scope.addNewline();
        $scope.removeThisLine(6);
        expect($scope.configuration.lines.length).toEqual(3);
      });
      it('should still have 3 lines (index to remove < 0)', () => {
        $scope.addNewline();
        $scope.addNewline();
        $scope.removeThisLine(-1);
        expect($scope.configuration.lines.length).toEqual(3);
      });
      //to test : index = index active line -> should change active line to fist line
      it('should set activeLine = 1 since removed first line (and not the last one)', () => {
        $scope.addNewline();
        $scope.addNewline();
        $scope.removeThisLine(0);
        expect($scope.configuration.activeLine).toEqual(1);
      });
    });
  });
});
