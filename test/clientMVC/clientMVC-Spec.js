//////////////////////////////////////////////
// ngwfWfEditController -  unit test
//////////////////////////////////////////////
describe('ngwfWfEditController', function() {
    beforeEach(module('ngwfApp'));

    var $rootScope, $scope, $controller;

    beforeEach(inject(function(_$rootScope_, _$controller_){
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $controller = _$controller_;
      
      $controller('ngwfWfEditController', {'$scope': $scope});
    }));


    //check if tests are up to date
    describe('test easyFormGeneratorVERSION - init', function() {
      it('is equaled to v1.0.5', function() {
          expect($scope.easyFormGeneratorVERSION).toEqual('v1.0.5');
      });
    });

    
    describe('setActiveLineNumber()', function() {
      it('should be equal 2', function() {

          //mock countConfigurationModelLines() called by setActiveLineNumber()
          spyOn($scope, 'countConfigurationModelLines').and.callFake(function() {
            return 3
          });

          $scope.setActiveLineNumber(2);          
          expect($scope.configuration.activeLine).toEqual(2);
      });
    });

    describe('setActiveLineNumber()', function() {
      it('should be equal 1', function() {

          //mock countConfigurationModelLines() called by setActiveLineNumber()
          spyOn($scope, 'countConfigurationModelLines').and.callFake(function() {
            return 1
          });

          $scope.setActiveLineNumber(2);          
          expect($scope.configuration.activeLine).toEqual(1);
      });
    });


});