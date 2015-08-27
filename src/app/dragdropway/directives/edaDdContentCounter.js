/**
 *  ------------------------------------------------------
 *  directive : edaDdContentCounterDirective
 *  ------------------------------------------------------
 *
 *  return real item count (hidden item being dragged that stay on the line)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
    .module('edaApp.directives.edaDdContentCounterDirective', [])
    .directive('ddContentCounter', ['dragDropItemCounterService', '$timeout',

    function(	dragDropItemCounterService, $timeout ){

  
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
    			
    			var timer;

       		/**
       		 * watch children length change : to update css item class
       		 */
    			$scope.$watch(
				    function () { return element[0].children.length; },
				    function (newValue, oldValue) {
				      if (newValue !== oldValue) {

				        var newRealCount= 0;
				        var listClassForThisRow = [];

				        for (var i = element[0].children.length - 1; i >= 0; i--) {
				        	
				        	if(dragDropItemCounterService.isHtmlElementToCount(element[0].children[i].classList)){
				        		newRealCount++;
				        		listClassForThisRow.push( {item: i, isReal : true} );
				        	}else{
				        		listClassForThisRow.push( {item: i, isReal : false} );
				        	} 
				        }
				        $scope.contentRealCount = newRealCount;
				        /**
				         * a timer otherwise won't refresh everytime
				         */
				        timer = $timeout(function(){
					        dragDropItemCounterService.updateLineItemCss(	$scope.fullModel, 
					        																							listClassForThisRow, 
					        																							$scope.parentIndex, 
					        																							$scope.currentIndex, 
					        																							newRealCount
					        																						);				        	
				        }, 20);
				        
				      }
				    }
				  );

          /**
           * timer destruction to prevent from bad UI experience
           */
          $scope.$on('$destroy', function(){
                  console.warn('ddContentCounter timer destruction!');
                  $timeout.cancel(timer);
              }
          ); 
		  
    		}
    	};

    }]);