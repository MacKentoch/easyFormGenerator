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
    		// controller: function($scope, $element, $attrs, $transclude) {},
    		restrict: 'A', 
    		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    		link: function($scope, element) {
    			
    			
    			if (element[0].children.length > 0) {
    				 			console.dir(
	    									{
	    										elementObj : element[0],
	    										elementClassName : element[0].className,
	    										elementChidrenCount : element[0].children.length
	    									}
    									);
    			}
   

    			//check child count change
    			$scope.$watch(
				    function () { return element[0].children.length; },
				    function (newValue, oldValue) {
				      if (newValue !== oldValue) {

				        console.warn('child count change detected : oldValue = ' + oldValue + ' - newValue = ' + newValue);
				        
				        var newRealCount= 0;
				        for (var i = element[0].children.length - 1; i >= 0; i--) {
				        	if(dragDropItemCounterService.isHtmlElementToCount(element[0].children[i])) newRealCount++;
				        }
				        $scope.contentRealCount = newRealCount;
								//todo : update modelRealItemsCount

				        console.dir(
				        							{
				        								'realcount' : 
				        							}
				        					);

				        //dragDropItemCounterService.update(columnIndex, LineIndex, counter);
				      }
				    }
				  );


				  // function isPlaceholder(htmlContent){
				  // 	return htmlContent.indexOf('dndPlaceholder') > -1 ?  true :  false;
				  // } 

				  // function isPlaceholder(htmlContent){
				  // 	return htmlContent.indexOf('fake') > -1 ?  true :  false;
				  // } 				  
    		}
    	};

    }]);