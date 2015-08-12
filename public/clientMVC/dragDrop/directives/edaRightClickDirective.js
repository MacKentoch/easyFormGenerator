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
    .directive('edaRightClick', ['$parse', 
    	function($parse){
    	
    	return {
    		restrict: 'A',
    		 
    		link: function(scope, element, attrs) {
	    		var fn             = $parse(attrs.edaRightClick);
                var columnIndex    = $parse(attrs.edaRightClickColIndex);
                var currentClass   = attrs.edaSelectedClass;
                var selectedState  = $parse(attrs.edaIsSelected);


    	        element.bind('contextmenu', function(event) {
    	            scope.$apply(function() {
    	                event.preventDefault();

                        console.info('selectedState=' + selectedState +'\n' + 'currentClass: ' +currentClass);

                        //right click limited to template column (index = 1)                           
                        if (columnIndex(scope) === 1) {
                            element.removeClass(currentClass);

                            if (selectedState) element.addClass(currentClass);
                            if (!selectedState) element.removeClass(currentClass);

                            selectedState = !selectedState;
                        }

                        //right click limited to template column (index = 1)   
    	                if (columnIndex(scope) === 1) fn(scope, {$event:event});
    	            });
    	        });	


                // function toggleSelected(val){
                //     return val === 'true' ? 'false' : 'true';
                // }

                // function isSelected(val){
                //     return val === 'true' ? true : false;
                // }

    		}
    	};
    }]);