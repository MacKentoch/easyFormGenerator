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
					edaEasyFormViewerFieldsModel 			: '=?',
					
					edaEasyFormViewerSubmitButtonText : '=?',
					edaEasyFormViewerCancelButtonText : '=?',
					
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
				
				scope.vm.model 					= {};
				scope.vm.fields 				= {};
				scope.vm.buttons.submit = 'Submit';
				scope.vm.buttons.cancel = 'Cancel';
				
				scope.watch(fieldsModelToWatch, fieldsModelWatcher, true);
				
				function fieldsModelToWatch(){
					return scope.vm.fields;
				}
				
				function fieldsModelWatcher(newFieldsModel, oldFieldsModel){
					console.info('fieldsModel Changed');
					console.dir(newFieldsModel);
					
					loadExistingConfigurationModel();
				}
				
				
				function loadExistingConfigurationModel(){
					
				}
				
			}
			
		}
		
})();