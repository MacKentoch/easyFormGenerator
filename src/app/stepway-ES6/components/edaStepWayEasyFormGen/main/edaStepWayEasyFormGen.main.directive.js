/* global angular */
import easyformTemplate from './edaStepWayEasyFormGen.main.template.html!text';
import edaStepWayEasyFormGenController, {
	STEP_WAY_MAIN_CONTROLLER_NAME, 
	STEP_WAY_MAIN_CONTROLLERAS_NAME
} from  './edaStepWayEasyFormGen.main.controller';

function edaStepWayEasyFormGenDirective(
			$templateCache, 
      $timeout, 
      formFieldManage,
      controllerModalProxy){
	
	var directive = {
		restrict 	: 'E',
		scope 		: {
			edaEasyFormGeneratorModel : '=',
			edaSaveFormEvent          : '&edaSaveFormEvent'
		},
		controller 		: STEP_WAY_MAIN_CONTROLLER_NAME,
		controllerAs 	: STEP_WAY_MAIN_CONTROLLERAS_NAME,
		replace 			: false,
		template			: easyformTemplate,
		link 					: linkFct
	};
	return directive;
	
	function linkFct(scope){
		
		//watch "scope.easyFormGeneratorModel"
		scope.$watch(() => scope.edaEasyFormGeneratorModel, (newValue, oldValue) => {
			loadExistingConfigurationModel();
			}, true);          
		
		//watch "scope.returnSaveEvent"" = catch saving form event  
		scope.$watch(() => scope.returnSaveEvent, (newValue, oldValue) => {
			if (newValue === true) {
				let _easyFormGeneratorModel = {
					formName          				: scope.configuration.formName,
					btnSubmitText     				: scope.configuration.submitButtonText,
					btnCancelText     				: scope.configuration.cancelButtonText,
					edaFieldsModel    				: scope.configuration.lines,
					edaFieldsModelStringified : angular.toJson(scope.configuration.lines),
					formlyFieldsModel 				: scope.vm.wfFormFieldsOnlyNeededProperties,
					dataModel         				: scope.vm.model
				};
				scope.edaSaveFormEvent({ edaEasyFormGeneratorModel : _easyFormGeneratorModel });
				//back to false, waiting next save event
				scope.returnSaveEvent = false;
			}
		});
		
		
		
		function loadExistingConfigurationModel(){
			if(angular.isDefined(scope.edaEasyFormGeneratorModel)){
				let configlines           = returnAttributeConfigurationLinesIfNotEmpty();           
				scope.configurationLoaded = {};
				
				formFieldManage.bindConfigurationLines(scope.configurationLoaded,configlines);
				/**
					* rebind special control properties :
					* 
					* formly expression properties
					* Validators
					* Validation
					*/
				controllerModalProxy.refreshControlFormlyExpressionProperties(scope.configurationLoaded);
				controllerModalProxy.refreshControlFormlyValidators(scope.configurationLoaded);
				controllerModalProxy.refreshControlFormlyValidation(scope.configurationLoaded);
				//apply configuration model
				scope.configuration = angular.copy(scope.configurationLoaded);
				//apply formly model
				formFieldManage.applyConfigurationToformlyModel(scope.configurationLoaded, scope.vm.wfFormFields, scope.vm.model);          
				scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
				scope.vm.model                            = returnAttributeDataModelIfNotEmpty;  
				scope.configuration.formName              = angular.isString(scope.edaEasyFormGeneratorModel.formName) ? scope.edaEasyFormGeneratorModel.formName : '';
				scope.configuration.submitButtonText      = angular.isString(scope.edaEasyFormGeneratorModel.btnSubmitText) ? scope.edaEasyFormGeneratorModel.btnSubmitText : 'Submit'; 
				scope.configuration.cancelButtonText      = angular.isString(scope.edaEasyFormGeneratorModel.btnCancelText) ? scope.edaEasyFormGeneratorModel.btnCancelText : 'Cancel';
			}  
		}
		
		function returnAttributeConfigurationLinesIfNotEmpty(){
			let edaEasyFormGeneratorModelToReturn = (
					angular.isArray(scope.edaEasyFormGeneratorModel.edaFieldsModel) ?  ( 
							scope.edaEasyFormGeneratorModel.edaFieldsModel.length > 0 ? 
								scope.edaEasyFormGeneratorModel.edaFieldsModel 
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
				
		
	}
}


edaStepWayEasyFormGenDirective.$inject = [
	'$templateCache', 
	'$timeout', 
	'formFieldManage',
	'controllerModalProxy'];
		

export default edaStepWayEasyFormGenDirective;