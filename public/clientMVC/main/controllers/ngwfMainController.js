///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "controllers"  for view "ngwfMainController"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.controllers.ngwfMainController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ngwfMainController = angular.module('ngwfApp.controllers.ngwfMainController', []);

ngwfMainController.controller('ngwfMainController', [	'$scope', 
														'$document', 
														'$modal',
														'$log', 
														function (	$scope, 
																	$document, 
																	$modal, 
																	$log) {

    //verbose
    console.log('--> INIT : Hello controller  \'\'ngwfMainController\'\' ');
      	
      //navbar model (ie : css on scroll)
      $scope.scrollflag = {};
   		$scope.scrollflag.boolNavBarChangeClass = false;
   		$scope.scrollflag.boolBottomButtonChangeClass = false;


   		//to hide when done (just a design helper : tell scroll x, y position)
	  	// $document.on('scroll', function() {
	    //          console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
	    //  });


	  	$scope.openImgCarousel = function(){
            var modalInstance = $modal.open({
              animation: true,
              templateUrl: 'imgCarouselModelTemplate.html',
              controller: 'imgCarouselModalCTRL',
              size: 'lg'//,
              // resolve: {
              //   items: function () {
              //     return true; //$scope.items;
              //   }
              //}
            });

            modalInstance.result.then(function (returnValFromImgModal) {
              $scope.returnfromImgCarouselModal = returnValFromImgModal;
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
          };
	  

}]);
