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
		
		edaEasyFormViewer.$inject = ['modelsTranslator'];
		
		function edaEasyFormViewer(modelsTranslator){
			//directive's controller injection is here (before return directive) = to avoid minification errors
			edaEasyFormViewerCtrl.$inject = [];
			
			var directive = {
				restrict : 'E',
				scope : {
					
          edaEasyFormViewerDataModel 										: '=?',
					edaEasyFormViewerEasyFormGeneratorFieldsModel : '=?',
					
					edaEasyFormViewerSubmitButtonText 						: '@?',
					edaEasyFormViewerCancelButtonText 						: '@?',
					
          edaEasyFormViewerSubmitFormEvent  						: '&?',
					edaEasyFormViewerCancelFormEvent							: '&?'
        },
				replace 			: false,
				
				controller		: edaEasyFormViewerCtrl,
				controllerAs 	: 'vm',
				templateUrl 	: 'eda.easyFormViewer.Template.html',
				
				link : linkFct
			};
			return directive;
			
			
			/**
			 * directive's link function
			 */
			function linkFct(scope, element, attrs){
				
				scope.vm.model 				= {};
				scope.vm.fields 			= loadFieldsModel();
				scope.vm.submitText 	= scope.edaEasyFormViewerSubmitButtonText || 'Submit';
				scope.vm.cancelText 	= scope.edaEasyFormViewerCancelButtonText || 'Cancel';	
								
				scope.$watch(fieldsModelToWatch, 		fieldsModelWatcher, 	true);
				scope.$watch(dataModelToWatch,			dataModelWatcher,			true);
				scope.$watch(submitBtnTextToWatch, 	submitBtnTextWatcher);
				scope.$watch(cancelBtnTextToWatch, 	cancelBtnTextWatcher);
				scope.$watch(submitEventToWatch, 		submitEventWatcher);
				scope.$watch(cancelEventToWatch, 		cancelEventWatcher);
				
				
				function dataModelToWatch(){
					return scope.vm.model;
				}
				
				
				function fieldsModelToWatch(){
					return scope.edaEasyFormViewerEasyFormGeneratorFieldsModel;
				}

				function submitBtnTextToWatch(){
					return scope.edaEasyFormViewerSubmitButtonText;
				}
				
				function cancelBtnTextToWatch(){
					return scope.edaEasyFormViewerCancelButtonText;
				}
				
				function submitEventToWatch(){
					return scope.vm.hasJustSumitted;
				}
				
				function cancelEventToWatch(){
					return scope.vm.hasJustCancelled;
				}				
				
				function fieldsModelWatcher(newFieldsModel, oldFieldsModel){					
					scope.vm.fields = loadExistingConfigurationModel(newFieldsModel);
				}
				
				function submitBtnTextWatcher(newSubmitBtntext, oldSubmitBtntext){
					if (newSubmitBtntext !== oldSubmitBtntext) {
						scope.vm.submitText 	= newSubmitBtntext || 'Submit';	
					}					
				}				
			
				function cancelBtnTextWatcher(newCancelBtntext, oldCancelBtntext){
					if (newCancelBtntext !== oldCancelBtntext) {
						scope.vm.cancelText 	= newCancelBtntext || 'Submit';	
					}					
				}	
				
				function dataModelWatcher(newDataModel, PreiousDataModel){
					scope.edaEasyFormViewerDataModel = newDataModel;
				}						
			
				function submitEventWatcher(newSubmitEvent, oldSubmitEvent){
					if (newSubmitEvent === true) {
							if (angular.isFunction(scope.edaEasyFormViewerSubmitFormEvent)) {
								var _dataModelSubmitted = scope.vm.model ;
								scope.edaEasyFormViewerSubmitFormEvent({ dataModelSubmitted : _dataModelSubmitted });
							}
					}
					scope.vm.hasJustSumitted = false;					
				}			
			
				function cancelEventWatcher(newCancelEvent, oldCancelEvent){
					if (newCancelEvent === true) {
							if (angular.isFunction(scope.edaEasyFormViewerCancelFormEvent)) {
								scope.edaEasyFormViewerCancelFormEvent();
							}
					}
					scope.vm.hasJustCancelled = false;					
				}				
			
				/**
				 * TODO : check if formly or easy form generato fields model
				 * 
				 * by default or if both -> easy for generator is chosen
				 */
				function loadFieldsModel(){
					
					var initialFieldsModel = angular
																		.isArray(scope.edaEasyFormViewerEasyFormGeneratorFieldsModel) ?
						//translate easy form generator to formly fields model
						loadExistingConfigurationModel(scope.edaEasyFormViewerEasyFormGeneratorFieldsModel)
						: {};
					
					return initialFieldsModel;
				}
				
        function loadExistingConfigurationModel(loadedFieldModel){
          
          if(angular.isArray(loadedFieldModel)){
            var configlines           = returnAttributeConfigurationLinesIfNotEmpty(loadedFieldModel); 
						var formlyFieldsModel 		= [];          
            
						scope.configurationLoaded = {};
            
            modelsTranslator.bindConfigurationLines(scope.configurationLoaded,configlines);
            /**
             * rebind special control properties :
             * 
             * formly expression properties
             * Validators
             * Validation
             */
            modelsTranslator.refreshControlFormlyExpressionProperties(scope.configurationLoaded);
            modelsTranslator.refreshControlFormlyValidators(scope.configurationLoaded);
            modelsTranslator.refreshControlFormlyValidation(scope.configurationLoaded);
            
            //apply configuration model
            scope.configuration = angular.copy(scope.configurationLoaded);
            
            //apply formly model
            modelsTranslator.applyConfigurationToformlyModel(scope.configurationLoaded, formlyFieldsModel, scope.vm.model);          
          	
						return  formlyFieldsModel;
          }  
   
			  } 
	
	
	        function returnAttributeConfigurationLinesIfNotEmpty(loadedFieldModel){
            var edaEasyFormGeneratorModelToReturn = (
                angular.isArray(loadedFieldModel) ?  ( 
                    loadedFieldModel.length > 0 ? 
                      loadedFieldModel 
                    : emptyEdaFieldsModel()
                    ) 
                : emptyEdaFieldsModel()
            );
             return edaEasyFormGeneratorModelToReturn;  
          }
          
          /**
           * empty fields model : to display at least an empty line
           * otherwise would look like ugly empty line like it were a bug
           */
					function emptyEdaFieldsModel(){
						var emptyModel = [
							{
								"line": 1,
								"activeColumn": 1,
								"columns": [
									{
										"numColumn": 1,
										"exist": true,
										"control": {
											"type": "none",
											"key": "none"
										}
									}
								]
							}
						];
						return emptyModel;
					}
          
          function returnAttributeDataModelIfNotEmpty(){
            var dataModelToReturn = (
                angular.isArray(scope.edaEasyFormGeneratorModel.dataModel)   ?  ( 
                    scope.edaEasyFormGeneratorModel.dataModel.length > 0 ? 
                    scope.edaEasyFormGeneratorModel.dataModel 
                    : []
                   ) 
                : []
            );
             return dataModelToReturn;  
          } 
	
	
				
			}
			
			
			
			
			/**
			 * directive's controller : controllerAs syntax
			 */
			function edaEasyFormViewerCtrl(){
				/* jshint validthis:true */
				var vm = this;
				//default :
				vm.model 									= {};
				vm.fields 								= {};
				vm.hasJustSumitted 				= false;
				vm.hasJustCancelled 			= false;
				vm.edaSubmitThisDataModel = edaSubmitThisDataModel;
				vm.edaCancelEvent 				= edaCancelEvent;
				
				function edaSubmitThisDataModel(){
					vm.hasJustSumitted = true;
				}
				function edaCancelEvent(){
					vm.hasJustCancelled = true;
				}
											
			}
			
			
			
		}
		
})();