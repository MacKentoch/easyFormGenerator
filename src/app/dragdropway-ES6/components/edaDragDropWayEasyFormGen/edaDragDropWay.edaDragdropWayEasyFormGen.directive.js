/* global angular */`


//TODO : to bindToController
//-> then angular 1.4+ will be required...
//-> check methot to refactor inside rag drop way then common step way and drag drop way

import edaDragDropWayEasyFormGenDirectiveTemplate 	from './edaDragDropWay.edaDragdropWayEasyFormGen.template.html!text';
import {
	DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER,
	DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLERAS
} 																									from './edaDragDropWay.edaDragdropWayEasyFormGen.controller';


const EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE = 'edaDragdropWayEasyFormGen';

function edaDragdropWayEasyFormGen(
	$timeout, 
	formFieldManage,
	ddModelConfModelProxyService,
	dragDropConfig){
	
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
	
	
	
	
	function linkFct(scope, element, attrs){              
		//watch "scope.easyFormGeneratorModel"
		scope.$watch(()=>scope.edaEasyFormGeneratorModel, (newValue, oldValue)=>loadExistingConfigurationModel(), true);
		  
		//watch "scope.returnSaveEvent"" = catch saving form event  
		scope.$watch(()=>scope.returnSaveEvent, (newValue, oldValue)=>{
			if (newValue === true) {
				let _easyFormGeneratorModel = {
					formName          				: scope.configuration.formName,
					btnSubmitText     				: scope.configuration.submitButtonText,
					btnCancelText     				: scope.configuration.cancelButtonText,
					edaFieldsModel    				: scope.configuration.lines,
					//just as test
					edaFieldsModelStringified : angular.toJson(scope.configuration.lines),
					formlyFieldsModel 				: scope.vm.wfFormFieldsOnlyNeededProperties,
					dataModel         				: scope.dataModel
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
					"line"					: 1,
					"activeColumn"	: 1,
					"columns"				: [
						{
							"numColumn"	: 1,
							"exist"			: true,
							"control"		: {
								"type"	: "none",
								"key"		: "none"
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
				scope.configurationLoaded = {};
				formFieldManage.bindConfigurationLines(scope.configurationLoaded,configlines, false);
				//apply configuration model
				scope.configuration = angular.copy(scope.configurationLoaded);
				//apply ddModel
				ddModelConfModelProxyService.loadDragDropModelFromConfigurationModel(scope.configuration, scope.dragDropModel);            
				updateConfigurationClassName(scope.configuration);
				ddModelConfModelProxyService.refreshControlsKeys(scope.configuration, scope.dragDropModel);             
				//apply formly model
				formFieldManage.applyConfigurationToformlyModel(scope.configuration, scope.vm.wfFormFields, scope.dataModel);          
				scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
				scope.dataModel                           = returnAttributeDataModelIfNotEmpty();  
				scope.configuration.formName              = angular.isString(scope.edaEasyFormGeneratorModel.formName) ? scope.edaEasyFormGeneratorModel.formName : '';
				scope.configuration.submitButtonText      = angular.isString(scope.edaEasyFormGeneratorModel.btnSubmitText) ? scope.edaEasyFormGeneratorModel.btnSubmitText : 'Submit'; 
				scope.configuration.cancelButtonText      = angular.isString(scope.edaEasyFormGeneratorModel.btnCancelText) ? scope.edaEasyFormGeneratorModel.btnCancelText : 'Cancel';
			}  
		} 
         
         
		function updateConfigurationClassName(configModel){
			angular.forEach(configModel.lines, (aline)=>{
				let cssClassToApply = dragDropConfig.getItemCssDependingNumberItemsInRow(aline.columns.length);
				angular.forEach(aline.columns, (aControl)=> {aControl.control.className = cssClassToApply}); 
			});         
		}  
          
      
      //closing link function             
}	
	
	
	
}

edaDragdropWayEasyFormGen.$inject = [
	'$timeout', 
	'formFieldManage',
	'ddModelConfModelProxyService',
	'dragDropConfig'	
];

export default edaDragdropWayEasyFormGen;

export {
	EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE
};