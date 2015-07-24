/**
 * 
 * ngwfDdContentCounterDirective directive :
 *
 * WHAT IS IT USED FOR? : 
 *
 * return real item count(does not count placeholder and hidden item being dragged)
 * 
 * 
 */
angular
    .module('ngwfApp.directives.ngwfDdContentCounterDirective', [])
    .directive('ddContentCounter', ['dragDropItemCounterService',

    function(dragDropItemCounterService){

  
    	return {
    		 scope: {
    		 	valueWhenPlaceholder: 	'@ddValueWhenPlaceholder',
    		 	valueWhendragging: 			'@ddValueWhenDragging',
    		 	fullModel : 						'=ddFullModel',
					currentIndex :       		'@ddContentCounterCurrentIndex',
          parentIndex :         	'@ddContentCounterParentIndex',
          forceRefresh: 					'=ddContentCounterForceCssRefresh' 
    		 }, 
    		
    		restrict: 'A', 
    		
    		link: function($scope, element) {
    			

       		//check child count change
    			$scope.$watch(
				    function () { return element[0].children.length; },
				    function (newValue, oldValue) {
				      if (newValue !== oldValue) {

				        var newRealCount= 0;
				        var listClassForThisRow = [];

				        for (var i = element[0].children.length - 1; i >= 0; i--) {
				        	//console.info('element is countabale' + dragDropItemCounterService.isHtmlElementToCount(element[0].children[i].classList));

				        	if(dragDropItemCounterService.isHtmlElementToCount(element[0].children[i].classList)){
				        		newRealCount++;
				        		listClassForThisRow.push({item: i, isReal : true});
				        	}else{
				        		listClassForThisRow.push({item: i, isReal : false});
				        	} 

				        }

				        $scope.contentRealCount = newRealCount;

				        dragDropItemCounterService.updateLineItemCss($scope.fullModel, listClassForThisRow, $scope.parentIndex, $scope.currentIndex, newRealCount);


		        //     /**
          //        * force refresh css class
          //        *
          //        * childDiv = angular.element(element.children()[0]); 
          //        * 
          //        */
				      //   for (var cpt = 0; cpt < element[0].children.length; cpt++) {
				      //   	 var child = angular.element(element.children()[cpt]); 
										// /**
										//  * RESET PREVIOUS CSS
										//  */
		        //         child.removeClass('col-md-12');
		        //         child.removeClass('col-md-6');
		        //         child.removeClass('col-md-4');
		        //         /**
		        //          * add class
		        //          */
		        //         // console.dir($scope.fullModel[$scope.parentIndex][$scope.currentIndex][cpt].cssClass);
		        //         if (typeof $scope.fullModel[$scope.parentIndex][$scope.currentIndex][cpt] !== 'undefined') {
		        //         	child.addClass($scope.fullModel[$scope.parentIndex][$scope.currentIndex][cpt].cssClass);
		        //         }
		                
				      //   }
				        
				      }
				    }
				  );



       		//check forcerefresh
    			$scope.$watch(
				    function () { return $scope.forceRefresh; },
				    function (newValue, oldValue) {
				      if (newValue !== oldValue &&
				      	  newValue === true) {

				      	$scope.forceRefresh = false;
				      
				        var newRealCount= 0;
				        var listClassForThisRow = [];

				        for (var i = element[0].children.length - 1; i >= 0; i--) {
				        	//console.info('element is countabale' + dragDropItemCounterService.isHtmlElementToCount(element[0].children[i].classList));

				        	if(dragDropItemCounterService.isHtmlElementToCount(element[0].children[i].classList)){
				        		newRealCount++;
				        		listClassForThisRow.push({item: i, isReal : true});
				        	}else{
				        		listClassForThisRow.push({item: i, isReal : false});
				        	} 

				        }

				        $scope.contentRealCount = newRealCount;

				        dragDropItemCounterService.updateLineItemCss($scope.fullModel, listClassForThisRow, $scope.parentIndex, $scope.currentIndex, newRealCount);


		        //     /**
          //        * force refresh css class
          //        *
          //        * childDiv = angular.element(element.children()[0]); 
          //        * 
          //        */
				      //   for (var cpt = 0; cpt < element[0].children.length; cpt++) {
				      //   	 var child = angular.element(element.children()[cpt]); 
										// /**
										//  * RESET PREVIOUS CSS
										//  */
		        //         child.removeClass('col-md-12');
		        //         child.removeClass('col-md-6');
		        //         child.removeClass('col-md-4');
		        //         /**
		        //          * add class
		        //          */
		        //         // console.dir($scope.fullModel[$scope.parentIndex][$scope.currentIndex][cpt].cssClass);
		        //         if (typeof $scope.fullModel[$scope.parentIndex][$scope.currentIndex][cpt] !== 'undefined') {
		        //         	child.addClass($scope.fullModel[$scope.parentIndex][$scope.currentIndex][cpt].cssClass);
		        //         }
		                
				      //   }
				        
				      }
				    }
				  );

				
		  
    		}
    	};

    }]);