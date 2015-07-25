/**
 *  ------------------------------------------------------
 *  directive : ddNoEditableControl
 *  ------------------------------------------------------
 *
 * prevent a control like an input to be editable 
 *  
 *  (otherwise should lead to bas use experience with drag and drop) 
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('ngwfApp.directives.ngwfDdNoEditableControlDirective', [])
	.directive('ddNoEditableControl', [

	function(){


		return {
		    
		    restrict: 'A',

		    link: function($scope, element) {    
		        
					element.bind('click', function(event){
						event.preventDefault();
						//console.dir('click on control not available.');
					});

		    }
			};

}]);

