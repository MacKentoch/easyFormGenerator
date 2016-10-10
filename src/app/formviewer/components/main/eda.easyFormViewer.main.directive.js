/* global angular */
import easyFormViewerTemplate 				from './eda.easyFormViewer.main.template.html!text';

import {
	returnAttributeConfigurationLinesIfNotEmpty
	}																		from './eda.easyFormViewer.main.directive.helpers';

import  {
	EASY_FORM_VIEWER_CONTROLLER,
	EASY_FORM_VIEWER_CONTROLLERAS
} 																		from './eda.easyFormViewer.main.controller';

const EASY_FORM_VIEWER_DIRECTIVE_NAME = 'edaEasyFormViewer';

function edaFormViewerDirective($modelsTranslator){
		var directive = {
			restrict 	: 'E',
			scope 		: {
				edaEasyFormViewerDataModel 										: '=?',
				edaEasyFormViewerEasyFormGeneratorFieldsModel : '=?',
				edaEasyFormViewerSubmitButtonText 						: '@?',
				edaEasyFormViewerCancelButtonText 						: '@?',
				edaEasyFormViewerSubmitFormEvent  						: '&?',
				edaEasyFormViewerCancelFormEvent							: '&?'
			},
			replace 			: false,
			controller		: EASY_FORM_VIEWER_CONTROLLER,
			controllerAs 	: EASY_FORM_VIEWER_CONTROLLERAS,
			template 			: easyFormViewerTemplate,
			link 					: linkFct
		};
	return directive;


	function linkFct(scope) {
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

		function fieldsModelWatcher(newFieldsModel){
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

		function dataModelWatcher(newDataModel){
			scope.edaEasyFormViewerDataModel = newDataModel;
		}

		function submitEventWatcher(newSubmitEvent){
			if (newSubmitEvent === true) {
					if (angular.isFunction(scope.edaEasyFormViewerSubmitFormEvent)) {
						const _dataModelSubmitted = scope.vm.model ;
						scope.edaEasyFormViewerSubmitFormEvent({ dataModelSubmitted : _dataModelSubmitted });
					}
			}
			scope.vm.hasJustSumitted = false;
		}

		function cancelEventWatcher(newCancelEvent){
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
				const configlines           = returnAttributeConfigurationLinesIfNotEmpty(loadedFieldModel);
				const formlyFieldsModel 		= [];

				scope.configurationLoaded = {};

				$modelsTranslator.bindConfigurationLines(scope.configurationLoaded,configlines);
				/**
					* rebind special control properties :
					*
					* formly expression properties
					* Validators
					* Validation
					*/
				$modelsTranslator.refreshControlFormlyExpressionProperties(scope.configurationLoaded);
				$modelsTranslator.refreshControlFormlyValidators(scope.configurationLoaded);
				$modelsTranslator.refreshControlFormlyValidation(scope.configurationLoaded);

				//apply configuration model
				scope.configuration = angular.copy(scope.configurationLoaded);

				//apply formly model
				$modelsTranslator.applyConfigurationToformlyModel(scope.configurationLoaded, formlyFieldsModel, scope.vm.model);

				return  formlyFieldsModel;
			}

		}




	}


}

edaFormViewerDirective.$inject = [
	'$modelsTranslator'
];
export default edaFormViewerDirective;
export {EASY_FORM_VIEWER_DIRECTIVE_NAME};
