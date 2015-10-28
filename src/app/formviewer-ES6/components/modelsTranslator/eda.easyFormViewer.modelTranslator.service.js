/* global angular */
import {
	resetNyaSelect,
	getConfigurationModelInit
}		from './eda.easyFormViewer.modelTranslator.service.helpers';

const MODEL_TRANSLATOR_SERVICE = '$modelsTranslator';



class $modelsTranslator{
	
	constructor(){
		
	}
	
	
	initNyaSelect(nyaSelectObj){
		return resetNyaSelect(nyaSelectObj);
	}	
	
	/**
		* get all controls definition (nyaSelectObj)
		* 
		* needed to bind these properties :
		* 
		* formlyExpressionProperties: {}, 
		* formlyValidators: {},
		* formlyValidation                       		
		*/	
	getControlsDefinition(){
		let controls = {};
		resetNyaSelect(controls);	
		return controls;
	}	
	
	/**
		* loading forms will not be able to retrieve formlyExpressionProperties
		* -> here does the job
		*/
	refreshControlFormlyExpressionProperties(configurationModel){
		if (angular.isObject(configurationModel)) {
			//iterates lines
			angular.forEach(configurationModel.lines, (line, indexLine) => {
				angular.forEach(line.columns, (column, controlIndex) => {
					let _controlsDefinition = this.getControlsDefinition();
					angular.forEach(_controlsDefinition.controls, (aControl, aControlIndex) => {
						if (column.control.type === aControl.formlyType &&
								column.control.subtype === aControl.formlySubtype) {
								//----> update control formlyExpressionProperties property											
								column.control.formlyExpressionProperties = aControl.formlyExpressionProperties;									
						}
					});		
				});
			});
		}	
	}	
	
	
	/**
		* loading forms will not be able to retrieve formlyValidators
		* -> here does the job
		*/			
	refreshControlFormlyValidators(configurationModel){
		if (angular.isObject(configurationModel)) {
			//iterates lines
			angular.forEach(configurationModel.lines, (line, indexLine) => {
				angular.forEach(line.columns, (column, controlIndex) => {
					let _controlsDefinition = this.getControlsDefinition();
					angular.forEach(_controlsDefinition.controls, (aControl, aControlIndex) => {
						if (column.control.type === aControl.formlyType &&
								column.control.subtype === aControl.formlySubtype) {
								//----> update control formlyValidators property											
								column.control.formlyValidators = aControl.formlyValidators;
						}
					});		
				});
			});
		}				
	}		
	
	
	/**
		* loading forms will not be able to retrieve formlyValidation
		* -> here does the job
		*/			
	refreshControlFormlyValidation(configurationModel){
		if (angular.isObject(configurationModel)) {
			//iterates lines
			angular.forEach(configurationModel.lines, (line, indexLine) => {
				angular.forEach(line.columns, (column, controlIndex) => {
					let _controlsDefinition = this.getControlsDefinition();
					angular.forEach(_controlsDefinition.controls, (aControl, aControlIndex) => {
						if (column.control.type === aControl.formlyType &&
								column.control.subtype === aControl.formlySubtype) {
								//----> update control formlyValidation property											
								column.control.formlyValidation = aControl.formlyValidation;
						}
					});		
				});
			});
		}					
	}
	
	
	initConfigurationEditFromScratch(configurationModel){
		configurationModel = angular.copy(getConfigurationModelInit());
	}	
	
		
	
}

$modelsTranslator.$inject = [];

export default $modelsTranslator;

export {MODEL_TRANSLATOR_SERVICE};
