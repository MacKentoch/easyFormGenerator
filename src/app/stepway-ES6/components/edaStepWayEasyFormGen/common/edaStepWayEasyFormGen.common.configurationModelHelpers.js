
const configurationModelInit = {
	activeLine: 1,   
	listConfigStep: [
										'init',
										'first',
										'second',
										'third'
									],
	stepIndicators:  [
											true,
											false,
											false,
											false
										], 
	configStepCounter : 0, 
	submitButtonText  : 'submit',
	cancelButtonText  : 'cancel',
	lines: [
					{
						line:1,                                       
						activeColumn : 1,
						columns: [
											{  
												numColumn: 1,
												exist:true, 
												control: {
																		type:'none',
																		key: 'none',
																		// templateOptions: {
																		//                     label: 'none',
																		//                     placeholder: 'none',
																		//                     required: false,
																		//                     description: 'Descriptive text'
																		//                   }
																	}
												}
											]
						}                                 
			]
}; 
 
const configurationModelResult =  {
	activeLine: 1,   
	listConfigStep: [
										'init',
										'first',
										'second',
										'third'
									],
	stepIndicators:  [
											true,
											false,
											false,
											false
										], 
	configStepCounter: 0, 
	submitButtonText : 'submit',
	cancelButtonText: 'cancel',
	lines: []
};



const isTemplateOptionDefined = (obj)=>{
	return typeof obj.templateOptions !== 'undefined' ? true : false;
}

const extractTemplateOptionLabel = (obj)=>{
	return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.label !== 'undefined'? obj.templateOptions.label: '') : '';
}

const extractTemplateOptionDatepickerPopup= (obj)=>{
	return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.datepickerPopup !== 'undefined'? obj.templateOptions.datepickerPopup: '') : '';
}

const extractFormlyExpressionProperties = (obj)=>{
	return  typeof obj.formlyExpressionProperties !== 'undefined' ? angular.copy(obj.formlyExpressionProperties) : {};
}

const extractFormlyValidators = (obj)=>{
	return  typeof obj.formlyValidators !== 'undefined' ? angular.copy(obj.formlyValidators): {};
}

const extractFormlyValidation = (obj)=>{
	return  typeof obj.formlyValidation !== 'undefined' ?  angular.copy(obj.formlyValidation) : {};
}

const extractTemplateOptionRequired = (obj)=>{
	return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.required !== 'undefined'? obj.templateOptions.required: '') : '';
}

const extractTemplateOptionOptions = (obj)=>{
	return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.options !== 'undefined'? obj.templateOptions.options: '') : '';
}

const extractTemplateOptionType = (obj)=>{
	return  typeof obj.subtype !== 'undefined'? obj.subtype: '';
}

const extractTemplateOptionPlaceholder = (obj)=>{
	return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.placeholder !== 'undefined'? obj.templateOptions.placeholder: '') : '';
}

const extractTemplateOptionDescription = (obj)=>{
	return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.description !== 'undefined'? obj.templateOptions.description: '') : '';
}


const addDatepickerPopupProperty = (fieldToPush, configurationModel,lineIndex) => {
		fieldToPush.templateOptions.datepickerPopup = extractTemplateOptionDatepickerPopup(configurationModel.lines[lineIndex].columns[0].control);
}


const addOneColumnHeader = (formlyModel, configurationModel,lineIndex) => {
	const headerTemplateCol0 = `<div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control)}<h2></div></div><hr/>`;
	formlyModel.push(
		{
			template: typeof configurationModel
															.lines[lineIndex]
															.columns[0]
															.control
															.type !== 'undefined' ? 
																(configurationModel.lines[lineIndex].columns[0].control.type === 'header' ? 
																	headerTemplateCol0 
																	: '<div></div>') 
																: '<div></div>'
		}
	);
}





 
export {
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
	addOneColumnHeader
	
}; 