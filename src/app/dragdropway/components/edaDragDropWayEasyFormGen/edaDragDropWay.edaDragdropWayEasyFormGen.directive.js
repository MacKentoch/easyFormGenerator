/* global angular */


//TODO : to bindToController
//-> then angular 1.4+ will be required...
//-> check methot to refactor inside rag drop way then common step way and drag drop way

import edaDragDropWayEasyFormGenDirectiveTemplate 	from './edaDragDropWay.edaDragdropWayEasyFormGen.template.html';
import {
	DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER,
	DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS
} 																									from './edaDragDropWay.edaDragdropWayEasyFormGen.controller';


const EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE = 'edaDragdropWayEasyFormGen';

function edaDragdropWayEasyFormGen(
	$timeout, 
	formFieldManage,
	ddModelConfModelProxyService,
	// dragDropConfig,
	easyFormDragWayConfig){
	
	let directive = {
		restrict 			: 'E',
		template			: edaDragDropWayEasyFormGenDirectiveTemplate,
		scope  				: {
			edaEasyFormGeneratorModel : '=',
			edaSaveFormEvent          : '&edaSaveFormEvent'			
		},
		controller 		: DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER,
		controllerAs 	: DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS,
		replace 			: false,		
		link					: linkFct
	};
	return directive;
	
	
	
	
	function linkFct(scope){              
		// watch "scope.easyFormGeneratorModel"
		scope.$watch(()=>scope.edaEasyFormGeneratorModel, ()=>loadExistingConfigurationModel(), true);

		// watch "scope.returnSaveEvent"" = catch saving form event  
		scope.$watch(()=>scope.returnSaveEvent, (newValue)=>{
			if (newValue === true) {
				let _easyFormGeneratorModel = {
					formName          				: scope.vm.configuration.formName,
					btnSubmitText     				: scope.vm.configuration.submitButtonText,
					btnCancelText     				: scope.vm.configuration.cancelButtonText,
					edaFieldsModel    				: scope.vm.configuration.lines,
					//just as test
					edaFieldsModelStringified : angular.toJson(scope.vm.configuration.lines),
					formlyFieldsModel 				: scope.vm.wfFormFieldsOnlyNeededProperties,
					dataModel         				: scope.vm.dataModel
				};
				scope.edaSaveFormEvent({
					edaEasyFormGeneratorModel : _easyFormGeneratorModel
				});
				//back to false, waiting next save event
				scope.returnSaveEvent = false;
			}            
		});	


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
			let emptyModel = [
				{
					'line'					: 1,
					'activeColumn'	: 1,
					'columns'				: [
						{
							'numColumn'	: 1,
							'exist'			: true,
							'control'		: {
								'type'	: 'none',
								'key'		: 'none'
							}
						}
					]
				}
			];
			return emptyModel;
		}

		function returnAttributeDataModelIfNotEmpty(){
			let dataModelToReturn = (
				angular.isArray(scope.edaEasyFormGeneratorModel.dataModel)   ?  ( 
					scope.edaEasyFormGeneratorModel.dataModel.length > 0 ? 
					scope.edaEasyFormGeneratorModel.dataModel 
					: []
					) 
				: []
			);
			return dataModelToReturn;  
		}         
 
              
		function loadExistingConfigurationModel(){
			if(angular.isDefined(scope.edaEasyFormGeneratorModel)){
				let configlines           = returnAttributeConfigurationLinesIfNotEmpty();           
				scope.vm.configurationLoaded = {};
				formFieldManage.bindConfigurationLines(scope.vm.configurationLoaded, configlines, false);
				//apply configuration model
				scope.vm.configuration = angular.copy(scope.vm.configurationLoaded);
				//apply ddModel
				ddModelConfModelProxyService.loadDragDropModelFromConfigurationModel(scope.vm.configuration, scope.vm.dragDropModel); 
				updateConfigurationClassName(scope.vm.configuration);
				ddModelConfModelProxyService.refreshControlsKeys(scope.vm.configuration, scope.vm.dragDropModel);             
				//apply formly model
				formFieldManage.applyConfigurationToformlyModel(scope.vm.configuration, scope.vm.wfFormFields, scope.vm.dataModel);          
				scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
				scope.vm.dataModel                        = returnAttributeDataModelIfNotEmpty();  
				scope.vm.configuration.formName           = angular.isString(scope.edaEasyFormGeneratorModel.formName) ? scope.edaEasyFormGeneratorModel.formName : '';
				scope.vm.configuration.submitButtonText   = angular.isString(scope.edaEasyFormGeneratorModel.btnSubmitText) ? scope.edaEasyFormGeneratorModel.btnSubmitText : 'Submit'; 
				scope.vm.configuration.cancelButtonText   = angular.isString(scope.edaEasyFormGeneratorModel.btnCancelText) ? scope.edaEasyFormGeneratorModel.btnCancelText : 'Cancel';
			}  
		} 
         
         
		function updateConfigurationClassName(configModel){
			angular.forEach(configModel.lines, (aline)=>{
				let cssClassToApply = easyFormDragWayConfig.getItemCssDependingNumberItemsInRow(aline.columns.length);
				angular.forEach(aline.columns, (aControl)=> aControl.control.className = cssClassToApply); 
			});         
		}

}	
	
	
	
}

edaDragdropWayEasyFormGen.$inject = [
	'$timeout', 
	'formFieldManage',
	'ddModelConfModelProxyService',
	// 'dragDropConfig',
	'easyFormDragWayConfig'	
];

export default edaDragdropWayEasyFormGen;

export {
	EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE
};