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
                //var selectedState  = $parse(attrs.edaIsSelected);



    	        element.on('contextmenu', function(event) {
    	            scope.$apply(function() {
    	                event.preventDefault();

                    
                        //right click limited to template column (index = 1)                           
                        if (columnIndex(scope) === 1) {
                            element.parent().removeClass(currentClass);

                            if (scope.selectedState) element.parent().addClass(currentClass);
                            if (!scope.selectedState) element.parent().removeClass(currentClass);

                            scope.selectedState = !scope.selectedState;

                            console.info('changed state : ' + scope.selectedState);
                        }

                        //right click limited to template column (index = 1)   
    	                if (columnIndex(scope) === 1) fn(scope, {$event:event});
    	            });
    	        });	


                // scope.$watch(function(){ return attrs.edaIsSelected; }, function (value){
                //     console.log(value);
                // });

                scope.$watch(attrs.edaIsSelected, function (value){
                    console.log(value);
                });                
                // attrs.$observe('', function(value){
                //     console.warn(value);
                // });


                // function toggleSelected(val){
                //     return val === 'true' ? 'false' : 'true';
                // }

                // function isSelected(val){
                //     return val === 'true' ? true : false;
                // }

    		}
    	};
    }]);