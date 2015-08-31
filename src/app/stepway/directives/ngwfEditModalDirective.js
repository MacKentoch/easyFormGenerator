/**
 *  ------------------------------------------------------
 *  easy form generator directive (Step way)
 *  ------------------------------------------------------
 * 
 *  all easy form generator emebeded in a directive
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
;(function(){
	'use strict';
	
	angular
		.module('ngwfApp.directives.edaStepWayEasyFormGenDirective', [])
		.directive('edaStepWayEasyFormGen', edaStepWayEasyFormGen);
		
		edaStepWayEasyFormGen.$inject = [];
		
		function edaStepWayEasyFormGen(){
			var directive = {
				restrict : 'AE',
				replace : true,
				templateUrl : 'editModalTemplate.html'
			};
			return directive;
		}
		
})();
