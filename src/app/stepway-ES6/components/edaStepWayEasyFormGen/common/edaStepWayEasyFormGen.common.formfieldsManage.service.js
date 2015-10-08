/* global angular */
import {
	configurationModelInit,
	configurationModelResult
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