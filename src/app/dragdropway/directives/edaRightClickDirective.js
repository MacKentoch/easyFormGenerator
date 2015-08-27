/**
 *  ------------------------------------------------------
 *  directive : edaRightClickDirective
 *  ------------------------------------------------------
 *
 *  manage right click
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
    .module('edaApp.directives.edaRightClickDirective', [])
    .directive('edaRightClick', [
        '$parse', 
    	function($parse){
    	
    	return {

    		restrict: 'A',
    		 
    		link: function(scope, element, attrs) {
	    		var fn                  = $parse(attrs.edaRightClick);
                var columnIndex         = $parse(attrs.edaRightClickColIndex);
                var fctSetRightclicked  = $parse(attrs.edaSetRightClicked);
                
                /**
                 * on right click event manage
                 * - open edit panel through attrs.edaRightClick function
                 * - set rightCliked attribute (to true) to control (in dragDropModel)
                 */
    	        element.on('contextmenu', function(event) {
    	            scope.$apply(function() {
    	                event.preventDefault();

                    
                        //right click limited to template column (index = 1)                           
                        if (columnIndex(scope) === 1) {
                            //set rightClicked to true
                            fctSetRightclicked(scope, {});
                        }

                        //right click limited to template column (index = 1)   
    	                if (columnIndex(scope) === 1) fn(scope, {$event:event});
    	            });
    	        });	



    		}
    	};
    }]);