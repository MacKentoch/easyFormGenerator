/**
 *  -----------------------------------------------------------------------
 *   easy form viewer directive
 *  -----------------------------------------------------------------------
 *  
 *   
 *     
 *
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
(function(){
	'use strict';
	
	angular
		.module('eda.easyFormViewer.Directive', [])
		.directive('edaEasyFormViewer', edaEasyFormViewer);
		
		edaEasyFormViewer.$inject = [];
		
		function edaEasyFormViewer(){
			var directive = {
				restrict : 'E',
				scope : {
          edaEasyFormViewerDataModel 				: '=?',
					edaEasyFormViewerfieldsModel 			: '=?',
          edaEasyFormViewerSubmitFormEvent  : '&?',
					edaEasyFormViewerCancelFormEvent	: '&?'
        },
				replace : false,
				templateUrl : 'eda.easyFormViewer.Template.html',
				link : linkFct
			};
			return directive;
			
			function linkFct(scope, element, attrs){
				console.info('edaEasyFormViewer directive loaded');
			}
			
		}
		
})();