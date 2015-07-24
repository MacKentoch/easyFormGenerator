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
angular
	.module('ngwfApp.directives.ngwfDdNoEditableControlDirective', [])
	.directive('ddNoEditableControl', [

	function(){


		return {
		    
		    restrict: 'A',
		    //require: '^ddDecorItem',

		    link: function($scope, element) {    
		        
					element.bind('click', function(event){
						event.preventDefault();
						console.dir('click on control not available.');
					});

					//$compile(element.contents())($scope);

		    }
			};

}]);

