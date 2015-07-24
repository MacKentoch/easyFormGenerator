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

    	console.info('directive ddContentCounter loaded');

    	return {
    		 scope: {
    		 	valueWhenPlaceholder: 	'@ddValueWhenPlaceholder',
    		 	valueWhendragging: 			'@ddValueWhenDragging'
    		 }, 
    		
    		restrict: 'A', 
    		
    		link: function($scope, element) {
    			

       			//check child count change
    			$scope.$watch(
				    function () { return element[0].children.length; },
				    function (newValue, oldValue) {
				      if (newValue !== oldValue) {

				        var newRealCount= 0;
				        for (var i = element[0].children.length - 1; i >= 0; i--) {
				        	if(dragDropItemCounterService.isHtmlElementToCount(element[0].children[i].classList)) newRealCount++;
				        }
				        $scope.contentRealCount = newRealCount;
								//todo : update modelRealItemsCount
								//
								console.info('counter : ' + newRealCount);


				        //dragDropItemCounterService.update(columnIndex, LineIndex, counter);
				      }
				    }
				  );
		  
    		}
    	};

    }]);