/**
 *  ------------------------------------------------------
 *  simple directive to set width style attribute in %
 *  ------------------------------------------------------
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

;(function () {
	
	'use strict';

	angular
		.module('ngwfApp.directives.ngwfStRatioDirective', [])
		.directive('stRatio', stRatio);

		stRatio.$inject = [];
		function stRatio(){

			var directive = {
				link : linkfct
			};

			return directive;

			function linkfct(scope, element, attr){
				var ratio=+(attr.stRatio);
			  element.css('width',ratio+'%');
			}

		}

})(); 



