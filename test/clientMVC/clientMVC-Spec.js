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
      
      $controller('ngwfWfEditController', {
                                            '$scope': $scope, 
                                          }
                  );
    }));


    //check if tests are up to date
    describe('Check easyFormGeneratorVERSION', function() {

     it('should be provided a version from app.value', inject(function(easyFormGenVersion) {
        expect(easyFormGenVersion).toEqual($scope.easyFormGeneratorVERSION);
      }));

    });

 
    



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


});