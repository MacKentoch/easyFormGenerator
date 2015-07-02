///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "controllers"  for view "imgCarouselModalCTRL"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.controllers.ngwfMainController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ngwfImageCarouselModalController = angular.module('ngwfApp.controllers.ngwfImageCarouselModalController', []);

ngwfImageCarouselModalController.controller('imgCarouselModalCTRL', [ '$scope', 
                                                                      '$modalInstance', 
                                                                      function (  $scope, 
                                                                                  $modalInstance) {
    //verbose
    console.log('--> INIT : Hello controller  \'\'imgCarouselModalCTRL\'\' ');
      	
         $scope.ok = function () {

            $modalInstance.close({returnVal: true});
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };



          //carousel
          $scope.myInterval = 5000;
          var slides = $scope.slides = [];

          $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
              image: ['./public/images/previewform.png','./public/images/designYourForm.png', './public/images/divideLinesColumns.png'][slides.length % 3],
               text: ['Preview','Design your form','Form layout'][slides.length % 3]
            });
          };

          for (var i=0; i<3; i++) {
            $scope.addSlide();
          }


}]);