/* global angular */
import {
	resetNyaSelect,
	returnControlFromAddCtrlModalModel,
	validKeyUniqueness	
} from './edaStepWayEasyFormGen.common.editControlModalProxy.helpers';

class controllerModalProxy{
	
	constructor() {
		
	}
	
	initNyaSelect(nyaSelectObj){
		return resetNyaSelect(nyaSelectObj);
	}	
	
	getControlsDefinition(){
		let controls = {};
		resetNyaSelect(controls);	
		return controls;
	}	

	getNyASelectFromSelectedLineColumn(nyaSelectObj, configurationObj, indexLine, numcolumn){
		resetNyaSelect(nyaSelectObj);
		/**
			* data send to modal controller                                           
			*/
		if (typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions != 'undefined') {
	
			nyaSelectObj.temporyConfig.selectedControl 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl 						!= 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl : 'none';
			nyaSelectObj.temporyConfig.formlyLabel 				= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label 			!= 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
			nyaSelectObj.temporyConfig.formlyRequired 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required 		!= 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
			nyaSelectObj.temporyConfig.formlyDesciption 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
			nyaSelectObj.temporyConfig.formlyPlaceholder 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
			nyaSelectObj.temporyConfig.formlyOptions 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options 		!= 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';
			
			nyaSelectObj.temporyConfig.formlyExpressionProperties = typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties 	!= 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties) : {};
			nyaSelectObj.temporyConfig.formlyValidators 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators 										!= 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators) : {};
			nyaSelectObj.temporyConfig.formlyValidation 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation 										!= 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation) : {};
			
			/**
				* particular case : datepicker 
				*/
			if (nyaSelectObj.temporyConfig.selectedControl === 'Date') {
				nyaSelectObj.temporyConfig.datepickerPopup 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';
			}
		}
		return nyaSelectObj;	    	
	}	
	

	bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, configurationObj){
						
		let extractedProps = returnControlFromAddCtrlModalModel(modalAddCtrlModel);
		configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl 		= extractedProps.selectedControl;
		configurationObj.lines[indexLine].columns[numcolumn].control.type 							= extractedProps.formlyType;
		configurationObj.lines[indexLine].columns[numcolumn].control.subtype 						= extractedProps.formlySubtype;
		//reset templateOptions
		configurationObj
			.lines[indexLine]
			.columns[numcolumn]
			.control.templateOptions 		= {
																			label: '',
																			required: false,
																			description: '',
																			placeholder: '',
																			options: []
																		};
			//then bind templateOptions                                                                                   
		configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label 			 = extractedProps.formlyLabel;
		configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required 	 = extractedProps.formlyRequired;
		configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description = extractedProps.formlyDesciption;
		configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder = extractedProps.formlyPlaceholder;
		configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options 		 = extractedProps.formlyOptions;
	
		configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties = angular.copy(extractedProps.formlyExpressionProperties);
		configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators 					= angular.copy(extractedProps.formlyValidators);
		configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation 					= angular.copy(extractedProps.formlyValidation);
	
		//////////////////////////////////////////
		// add additionnal particular properties
		//////////////////////////////////////////
		//-> datepicker : datepickerPopup
		if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
			configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup = extractedProps.datepickerPopup;
		}	
		/**
			* unique key (set only first time) in this model is formly control type + Date.now();  
			*/
		let newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
	
		if (validKeyUniqueness(newKey, configurationObj) === true){
			configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
		}else{
			/**
				* 2nd attempt 
				*/
			newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
	
			if (validKeyUniqueness(newKey, configurationObj) === true){
				configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
			}else{
				/**
					* 3rd attempt 
					*/
				newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
			}
		}                                                                     
		configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;
	}	
	
	
	applyConfigToSelectedControl(nyaSelectObj){
		/**
			* used in modal (edit control) 
			*/
		for (let i = nyaSelectObj.controls.length - 1; i >= 0; i--) {
			if (nyaSelectObj.controls[i].id === nyaSelectObj.selectedControl) {
	
					nyaSelectObj.controls[i].formlyLabel 								= nyaSelectObj.temporyConfig.formlyLabel;
					nyaSelectObj.controls[i].formlyRequired 						= nyaSelectObj.temporyConfig.formlyRequired;
					nyaSelectObj.controls[i].formlyDesciption 					= nyaSelectObj.temporyConfig.formlyDesciption;
					nyaSelectObj.controls[i].formlyPlaceholder 					= nyaSelectObj.temporyConfig.formlyPlaceholder;
					nyaSelectObj.controls[i].formlyOptions 							= nyaSelectObj.temporyConfig.formlyOptions;
	
					if (nyaSelectObj.controls[i].id ==='Date' ) {
						nyaSelectObj.controls[i].datepickerPopup 					= nyaSelectObj.temporyConfig.datepickerPopup;
					}
				
				}
		}
	}	
	
	
	
}

controllerModalProxy.$inject= [];
export default controllerModalProxy;