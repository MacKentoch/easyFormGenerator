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

            scope: {
                selectedState : '=edaIsSelected'
            },

    		restrict: 'A',
    		 
    		link: function(scope, element, attrs) {
	    		var fn             = $parse(attrs.edaRightClick);
                var columnIndex    = $parse(attrs.edaRightClickColIndex);
                var currentClass   = attrs.edaSelectedClass;
                

    	        element.on('contextmenu', function(event) {
    	            scope.$apply(function() {
    	                event.preventDefault();

                    
                        //right click limited to template column (index = 1)                           
                        if (columnIndex(scope) === 1) {
                            element.parent().removeClass(currentClass);

                            if (scope.selectedState) element.parent().addClass(currentClass);
                            if (!scope.selectedState) element.parent().removeClass(currentClass);

                            scope.selectedState = !scope.selectedState;

                            //console.info('changed state : ' + scope.selectedState);
                        }

                        //right click limited to template column (index = 1)   
    	                if (columnIndex(scope) === 1) fn(scope, {$event:event});
    	            });
    	        });	


                // scope.$watch(function(){return scope.selectedState;}, function (value){
                    
                //     element.parent().removeClass(currentClass);

                //     if (scope.selectedState) element.parent().addClass(currentClass);
                //     if (!scope.selectedState) element.parent().removeClass(currentClass);
                    
                //     console.log('watch : ' + value);    
                    
                // });                
          

    		}
    	};
    }]);