/**
 *  ------------------------------------------------------
 *  edit Modal html template directive
 *  ------------------------------------------------------
 * 
 *  (template from template cache : ok for static and performance friendly)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function(){
	'use strict';
	
	angular
		.module('ngwfApp.directives.ngwfEditModalDirective', [])
		.directive('ngwfEditModalDirective', ngwfEditModalDirective);
		
		ngwfEditModalDirective.$inject = [];
		
		function ngwfEditModalDirective(){
			var directive = {
				restrict : 'AE',
				replace : true,
				templateUrl : 'editModalTemplate.html'
			}
			return directive;
		}
		
})();
