/* global angular */
import {
	configurationModelInit,
	configurationModelResult,
	isTemplateOptionDefined,
	extractTemplateOptionLabel,
	extractTemplateOptionDatepickerPopup,
	extractFormlyExpressionProperties,
	extractFormlyValidators,
	extractFormlyValidation, 
	extractTemplateOptionRequired,
	extractTemplateOptionOptions,
	extractTemplateOptionType, 
	extractTemplateOptionPlaceholder, 
	extractTemplateOptionDescription,
	
	addDatepickerPopupProperty,
	addOneColumnHeader,
	addOneColumnControl,
	addTwoColumnControl,
	addThreeColumnControl	
	
} from './edaStepWayEasyFormGen.common.configurationModelHelpers';
const FORM_FIELD_MANAGE_SERVICE = 'formFieldManage';

class formFieldManage{
	
	constructor() {
		this.init();
	}
	
	init() {
		
	}
	
	initConfigurationEditFromScratch(configurationModel) {
		angular.copy(configurationModelInit, configurationModel);
	}
	
	bindConfigurationLines(configurationModel, lines) {
		if(angular.isArray(lines)){
			let configModelResult = configurationModelResult;
			configModelResult.lines = [].concat(lines);  
			angular.copy(configModelResult, configurationModel);
			return this.getMessageObject(`configuration model is bound`,`lines are bound to configuration model.`);			
		}else{
			return this.getErrorObject(`lines is not an array`, `Checks lines type, it is not an array.`);
		}
	}
	
	applyConfigurationToformlyModel(configurationModel, formlyModel, formlyDataModel) {
		this.resetFormlyModel(formlyModel);
		this.resetDataModel(formlyDataModel);
		/**
			* manage header here line0 
			*/
		var lineNumber = configurationModel.lines.length;
		for (var i = 0; i < lineNumber; i++) {
				//1 column line control
				if (configurationModel.lines[i].columns.length === 1) {
					//test if template control = header
					if (configurationModel.lines[i].columns[0].control.type === 'header') {
						addOneColumnHeader(formlyModel, configurationModel, i);
					}else{
						addOneColumnControl(formlyModel, configurationModel, i);  
					}          
				}
				if (configurationModel.lines[i].columns.length === 2) {
					addTwoColumnControl(formlyModel, configurationModel,i);
				}
				if (configurationModel.lines[i].columns.length === 3) {
					addThreeColumnControl(formlyModel, configurationModel,i);
				}
		}
	}
	
	getMessageObject(messageTitle, messageBody){
		let messageObj = {
			noError : true,
			title		: messageTitle,
			Message	: messageBody  
		};
		return messageObj;
	}    		
	
}

formFieldManage.$inject = [];
export default formFieldManage;
export {FORM_FIELD_MANAGE_SERVICE};