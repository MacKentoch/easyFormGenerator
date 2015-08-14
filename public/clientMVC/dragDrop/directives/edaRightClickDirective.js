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

            // scope: {
            //     selectedState : '=edaIsSelected'
            // },

    		restrict: 'A',
    		 
    		link: function(scope, element, attrs) {
	    		var fn                  = $parse(attrs.edaRightClick);
                var columnIndex         = $parse(attrs.edaRightClickColIndex);
                var currentClass        = attrs.edaSelectedClass;
                var selectedState       = $parse(attrs.edaIsSelected);
                var fctSetRightclicked  = $parse(attrs.edaSetRightClicked);
                
                /**
                 * on right click event manage
                 * - open edit panel through attrs.edaRightClick function
                 * - set rightCliked attribute (to true) to control (in dragDropModel)
                 * - add selected cssClass
                 */
    	        element.on('contextmenu', function(event) {
    	            scope.$apply(function() {
    	                event.preventDefault();

                    
                        //right click limited to template column (index = 1)                           
                        if (columnIndex(scope) === 1) {
                            

                            //element.parent().removeClass(currentClass);

                            //if (!selectedState(scope)) element.parent().addClass(currentClass);
                            // if (selectedState(scope)) element.parent().removeClass(currentClass);

                            //set rightClicked to true
                            fctSetRightclicked(scope, {previousState : false});
                        }

                        //right click limited to template column (index = 1)   
    	                if (columnIndex(scope) === 1) fn(scope, {$event:event});
    	            });
    	        });	

                /**
                 * observe IsSelected (= rightClicked attribute)
                 * - add/remove selected cssClass depending rightClicked attribute
                 */
                // attrs.$observe('edaIsSelected', function (newValue, oldValue){
                    

                //     if (columnIndex(scope) === 1 &&
                //         newValue !== oldValue) {

                //         console.info('observed :' + newValue);
                //         console.dir(    
                //                     {
                //                         'elementParent' : element.parent(),
                //                         'currentClass' : currentClass
                //                     }
                //                     );

                //         element.parent().removeClass(currentClass);

                //         //if (newValue === true) element.parent().addClass(currentClass);                        
                //         //if (!value) element.parent().removeClass(currentClass);
                //         if (!selectedState(scope)) element.parent().addClass(currentClass);
                //         if (selectedState(scope)) element.parent().removeClass(currentClass);                        

                //     }                       
                    
                // });                

                scope.$watch(function(){return selectedState(scope);}, function (value){
                    
                    element.parent().removeClass(currentClass);

                    if (value === true) element.parent().addClass(currentClass);
                    if (value === false) element.parent().removeClass(currentClass);
                    
                    console.log('watch : ' + value);    
                    
                });                
          

    		}
    	};
    }]);