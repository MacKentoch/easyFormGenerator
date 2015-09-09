/* global inject */
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />

'use strict';

/**
 * controller : ngwfWfEditController -  unit test 
 */
describe('controller : ngwfWfEditController', function() {
    
  
    beforeEach(function(){
      module('ngwfApp')
    });

    var $rootScope, $scope, $controller;

    beforeEach(inject(function(_$rootScope_, _$controller_){
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();

      $controller = _$controller_;
      
      $controller('ngwfWfEditController', {
                                            '$scope': $scope, 
                                          }
                  );
    }));


    describe('Check easyFormGeneratorVERSION', function() {

     it('should be provided a version from app.value', inject(function(easyFormGenVersion) {
        expect(easyFormGenVersion).toEqual($scope.easyFormGeneratorVERSION);
      }));

    });

 
    
    describe('line control - step 0', function(){

      // countConfigurationModelLines
      

      describe('setActiveLineNumber(2) — when $scope.configuration.lines.length = 3', function() {
        it('should equal 2', function() {

            //mock countConfigurationModelLines() called by setActiveLineNumber()
            spyOn($scope, 'countConfigurationModelLines').and.callFake(function() {
              return 3
            });

            $scope.setActiveLineNumber(2);          
            expect($scope.configuration.activeLine).toEqual(2);
        });
      });

      describe('setActiveLineNumber(2)  — when $scope.configuration.lines.length = 1', function() {
        it('should equal 1', function() {

            //mock countConfigurationModelLines() called by setActiveLineNumber()
            spyOn($scope, 'countConfigurationModelLines').and.callFake(function() {
              return 1
            });

            $scope.setActiveLineNumber(2);          
            expect($scope.configuration.activeLine).toEqual(1);
        });
      });

      describe('addNewLine', function() {

        //reset scope.configuation before each 
        //inject formFieldManage service to initialize configuration model
        beforeEach(inject(function(_formFieldManage_){
            var formFieldManage = _formFieldManage_;
            $scope.configuration = {};
            formFieldManage.initConfigurationEditFromScratch($scope.configuration);          
        }));


        //tets case configuration model has not been initialized
        it('should have no line', function(){
          $scope.configuration = {};
          expect($scope.configuration.lines).toBeUndefined();
        });

        it('should have 1 line', function() {  
            expect($scope.configuration.lines.length).toEqual(1);
        });

        it('should have 2 line', function() {
            $scope.addNewline();            
            expect($scope.configuration.lines.length).toEqual(2);
        });
      });

      describe('removeThisLine', function() {

        //reset scope.configuation before each 
        //inject formFieldManage service to initialize configuration model
        beforeEach(inject(function(_formFieldManage_){
            var formFieldManage = _formFieldManage_;
            $scope.configuration = {};
            formFieldManage.initConfigurationEditFromScratch($scope.configuration);          
        }));

        it('should not remove last line', function(){
         $scope.removeThisLine(); 
          expect($scope.configuration.lines.length).toEqual(1);
        });

        it('should have 2 lines left (had 3 lines - removed at index 0)', function() { 
            $scope.addNewline();
            $scope.addNewline(); 
            $scope.removeThisLine(0);
            expect($scope.configuration.lines.length).toEqual(2);
        });

        it('should still have 3 lines (index to remove > max index)', function() { 
            $scope.addNewline();
            $scope.addNewline(); 
            $scope.removeThisLine(6);
            expect($scope.configuration.lines.length).toEqual(3);
        });

        it('should still have 3 lines (index to remove < 0)', function() { 
            $scope.addNewline();
            $scope.addNewline(); 
            $scope.removeThisLine(-1);
            expect($scope.configuration.lines.length).toEqual(3);
        });

        //to test : index = index active line -> should change active line to fist line
        it('should set activeLine = 1 since removed first line (and not the last one)', function() { 
            $scope.addNewline();
            $scope.addNewline(); 
            $scope.removeThisLine(0);
            expect($scope.configuration.activeLine).toEqual(1);
        });

      });  

      // downThisLine

      // upThisLine

      //  



    });





});