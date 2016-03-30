import easyformTemplate            from './stepway.main.template.html!text';
import {
	STEP_WAY_MAIN_CONTROLLER_NAME,
	STEP_WAY_MAIN_CONTROLLERAS_NAME
}                                  from  './stepway.main.controller';


const STEP_WAY_DIRECTIVE_NAME = 'edaStepWayEasyFormGen';

function edaStepWayEasyFormGenDirective(
			$templateCache,
      $timeout,
      $formlyProxy,
      $modalProxy) {

	let directive = {
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
		scope.$watch(() => scope.edaEasyFormGeneratorModel,
			(newValue, oldValue) => {
				loadExistingConfigurationModel();
			}, true);

		//watch "scope.vm.returnSaveEvent"" = catch saving form event
		scope.$watch(() => scope.vm.returnSaveEvent, (newValue, oldValue) => {
			if (newValue === true) {
				let _easyFormGeneratorModel = {
					formName          				: scope.vm.configuration.formName,
					btnSubmitText     				: scope.vm.configuration.submitButtonText,
					btnCancelText     				: scope.vm.configuration.cancelButtonText,
					edaFieldsModel    				: scope.vm.configuration.lines,
					edaFieldsModelStringified : angular.toJson(scope.vm.configuration.lines),
					formlyFieldsModel 				: scope.vm.wfFormFieldsOnlyNeededProperties,
					dataModel         				: scope.vm.dataModel
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
				$formlyProxy.bindConfigurationLines(scope.configurationLoaded,configlines);
				/**
					* rebind special control properties :
					*
					* formly expression properties
					* Validators
					* Validation
					*/
				$modalProxy.refreshControlFormlyExpressionProperties(scope.configurationLoaded);
				$modalProxy.refreshControlFormlyValidators(scope.configurationLoaded);
				$modalProxy.refreshControlFormlyValidation(scope.configurationLoaded);
				//apply configuration model
				scope.vm.configuration = angular.copy(scope.configurationLoaded);
				//apply formly model
				$formlyProxy.applyConfigurationToformlyModel(scope.configurationLoaded, scope.vm.wfFormFields, scope.vm.model);
				scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
				scope.vm.dataModel                            = returnAttributeDataModelIfNotEmpty();
				scope.vm.configuration.formName           = angular.isString(scope.edaEasyFormGeneratorModel.formName) 			? scope.edaEasyFormGeneratorModel.formName 			: '';
				scope.vm.configuration.submitButtonText   = angular.isString(scope.edaEasyFormGeneratorModel.btnSubmitText)	? scope.edaEasyFormGeneratorModel.btnSubmitText	: 'Submit';
				scope.vm.configuration.cancelButtonText   = angular.isString(scope.edaEasyFormGeneratorModel.btnCancelText)	? scope.edaEasyFormGeneratorModel.btnCancelText	: 'Cancel';
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

		function returnAttributeDataModelIfNotEmpty(){
			var dataModelToReturn = (
					angular.isArray(scope.edaEasyFormGeneratorModel.dataModel)   ?  (
							scope.edaEasyFormGeneratorModel.dataModel.length > 0 ?
							scope.edaEasyFormGeneratorModel.dataModel
							: {}
							)
					: {}
			);
				return dataModelToReturn;
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
	'$formlyProxy',
	'$modalProxy'
];


export default edaStepWayEasyFormGenDirective;
export {STEP_WAY_DIRECTIVE_NAME};
