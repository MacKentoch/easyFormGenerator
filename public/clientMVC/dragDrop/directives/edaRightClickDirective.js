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
                //var selectedClas  = attrs.edaSelectedClas;  //= $parse(attrs.edaSelectedClass);
                var selectedState  = $parse(attrs.edaIsSelected);

                console.info('selectedState(scope) ' + selectedState(scope));
                console.info('selectedClass(scope) ' + selectedClas(scope));   


    	        element.bind('contextmenu', function(event) {
    	            scope.$apply(function() {
    	                event.preventDefault();

                        //right click limited to template column (index = 1)                           
                        if (columnIndex(scope) === 1) {
                            if (isSelected(selectedState(scope))) element.addClass(selectedClas(scope));
                            toggleSelected(selectedState(scope)); 

                            console.dir(    {
                                  selectedClass: selectedClas(scope),
                                  selectedState: selectedState(scope)  
                            });

                      
                        }

                        //right click limited to template column (index = 1)   
    	                if (columnIndex(scope) === 1) fn(scope, {$event:event});
    	            });
    	        });	


                function toggleSelected(val){
                    return val === 'true' ? 'false' : 'true';
                }

                function isSelected(val){
                    return val === 'true' ? true : false;
                }

    		}
    	};
    }]);