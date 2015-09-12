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
			var directive = {
				restrict : 'E',
				scope : {
					
          edaEasyFormViewerDataModel 										: '=?',
					edaEasyFormViewerEasyFormGeneratorFieldsModel : '=?',
					
					edaEasyFormViewerSubmitButtonText 						: '=?',
					edaEasyFormViewerCancelButtonText 						: '=?',
					
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
				
				console.info('edaEasyFormViewer directive loaded');

				scope.vm.model 				= {};
				scope.vm.fields 			= loadFieldsModel();
				scope.vm.submitText 	= 'Submit';
				scope.vm.cancelText 	= 'Cancel';	
				
							
				
				scope.$watch(fieldsModelToWatch, fieldsModelWatcher, true);
				
				function fieldsModelToWatch(){
					return scope.edaEasyFormViewerEasyFormGeneratorFieldsModel;
				}
				
				function fieldsModelWatcher(newFieldsModel, oldFieldsModel){
					console.info('fieldsModel Changed');
					console.dir(newFieldsModel);
					
					scope.vm.fields = loadExistingConfigurationModel(newFieldsModel);
					console.dir(scope.vm.fields);
				}
				

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
						
						console.dir({'scope.configurationLoaded' : scope.configurationLoaded});
						
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
				vm.model 			= {};
				vm.fields 			= {};
				vm.submitText 	= 'Submit';
				vm.cancelText 	= 'Cancel';				
			}
			
			
			
		}
		
})();