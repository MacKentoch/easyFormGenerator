/**
 * 
 * dd-no-editable-control directive :
 *
 * WHAT IS IT USED FOR? : 
 *
 * prevent a control like an input to be editable 
 *  
 *  (should lead to bas use experience with drag and drop)
 * 
 */
angular.module('ngwfApp.directives.ngwfDdNoEditableControlDirective', []).directive('ddNoEditableControl', [function(){

	console.info('ddNoEditableControl loaded');

	return {
	    scope:  {},
	    restrict: 'A',
	    require: '^ddDecorItem',


	    link: function($scope, element, attrs, ctrl, transclude) {    
	        
				element.on('click', function(){
					console.dir('click on control not available.');
					return false;
				});

	    }
		};

}]);

