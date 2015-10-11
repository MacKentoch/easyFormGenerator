
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
	formlyModel.push({
		template: typeof configurationModel
												.lines[lineIndex]
												.columns[0]
												.control
												.type !== 'undefined' ? 
													(configurationModel.lines[lineIndex].columns[0].control.type === 'header' ? 
														headerTemplateCol0 
														: '<div></div>') 
													: '<div></div>'
	});
}



const addOneColumnControl = (formlyModel, configurationModel,lineIndex) => {
	let fieldToPush = {
		className	: 'col-xs-12',
		type			: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
		key				: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
		templateOptions: {
			type                  : extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
			label                 : extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
			required              : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
			placeholder           : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
			description           : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
			options               : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
		},
		expressionProperties  : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
		validators            : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
		validation            : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
	};
	//////////////////////////////////////////////                  
	//datepicker additionnal particular property  
	//////////////////////////////////////////////                  
	if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
		addDatepickerPopupProperty(fieldToPush, configurationModel,lineIndex);
	}     

	formlyModel.push(fieldToPush);
}    



const addTwoColumnControl = (formlyModel, configurationModel,lineIndex) => {

	//text header is stored in "description" in templateOtion model
	const headerTemplateCol0 =  {
				className: 'col-xs-6',
				template : `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control)}<h2><hr/></div></div>`
			};

	const headerTemplateCol1 =  {
				className: 'col-xs-6',
				template:`<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control)}<h2><hr/></div></div>`
			};

	let controlCol0 =     {
			className: 'col-xs-6',
			type: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
			key	: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
			templateOptions: {
					type					: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
					label					: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
					required 			: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
					placeholder 	: extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
					description 	: extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
					options 			: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
			},
					expressionProperties 	: extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
					validators 						: extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
					validation 						: extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)                                  
		};
	//////////////////////////////////////////////                  
	//datepicker additionnal particular property  
	//////////////////////////////////////////////                  
	if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
		addDatepickerPopupProperty(controlCol0, configurationModel,lineIndex);
	}                            

	let controlCol1 =  {
		className: 'col-xs-6',
		type			: typeof configurationModel.lines[lineIndex].columns[1].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[1].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[1].control.type) : 'blank',
		key				: typeof configurationModel.lines[lineIndex].columns[1].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[1].control.key : 'blank' + Date.now(),
		templateOptions	: {
				type				: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[1].control),
				label				: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[1].control),
				required 		: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[1].control),
				placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[1].control),
				description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control),
				options 		: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[1].control)
		},
				expressionProperties 	: extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
				validators 						: extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
				validation 						: extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)                                  
		};

	//////////////////////////////////////////////                  
	//datepicker additionnal particular property  
	//////////////////////////////////////////////                  
	if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') {
		addDatepickerPopupProperty(controlCol1, configurationModel,lineIndex);
	}                                

	let FieldGroup = [];

	if (configurationModel.lines[lineIndex].columns[0].control.type === 'header') {
		FieldGroup.push(headerTemplateCol0);
	}else{
		FieldGroup.push(controlCol0);
	}
		
	if (configurationModel.lines[lineIndex].columns[1].control.type === 'header') {
		FieldGroup.push(headerTemplateCol1);
	}else{
		FieldGroup.push(controlCol1);
	}    

	formlyModel.push({
		className: 'row', 
		fieldGroup: FieldGroup
	});
};




const addThreeColumnControl = (formlyModel, configurationModel,lineIndex) => {
	//text header is stored in "description" in templateOtion model
	const headerTemplateCol0 =  {
					className: 'col-xs-4',
					template : `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control)}<h2><hr/></div></div>`
				};

	const headerTemplateCol1 =  {
					className: 'col-xs-4',
					template:`<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control)}<h2><hr/></div></div>`
				};

	const headerTemplateCol2 =  {
					className: 'col-xs-4',
					template:`<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control)}<h2><hr/></div></div>`
				};

	let controlCol0 =  {
		className	: 'col-xs-4',
		type			: typeof configurationModel.lines[lineIndex].columns[0].control.type 	!== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
		key				: typeof configurationModel.lines[lineIndex].columns[0].control.key 	!== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
		templateOptions: {
				type				: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
				label				: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
				required 		: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
				placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
				description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
				options 		: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)                                              
		},
				expressionProperties 	: extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
				validators 						: extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
				validation 						: extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)                                   
		};
	//////////////////////////////////////////////                  
	//datepicker additionnal particular property  
	//////////////////////////////////////////////                  
	if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
		addDatepickerPopupProperty(controlCol0, configurationModel,lineIndex);
	}                             

	let controlCol1 = {
		className	: 'col-xs-4',
		type			: typeof configurationModel.lines[lineIndex].columns[1].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[1].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[1].control.type) : 'blank',
		key				: typeof configurationModel.lines[lineIndex].columns[1].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[1].control.key : 'blank' + Date.now(),
		templateOptions: {
				type				: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[1].control),
				label				: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[1].control),
				required 		: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[1].control),
				placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[1].control),
				description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control),
				options 		: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[1].control)                                               
		},
				expressionProperties 	: extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
				validators 						: extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
				validation 						: extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)                                  
	};
	//////////////////////////////////////////////                  
	//datepicker additionnal particular property  
	//////////////////////////////////////////////                  
	if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') {
		addDatepickerPopupProperty(controlCol1, configurationModel,lineIndex);
	}                       
	let controlCol2 = {
		className	: 'col-xs-4',
		type			: typeof configurationModel.lines[lineIndex].columns[2].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[2].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[2].control.type) : 'blank',
		key				: typeof configurationModel.lines[lineIndex].columns[2].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[2].control.key : 'blank' + Date.now(),
		templateOptions: {
				type				: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[2].control),
				label				: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[2].control),
				required 		: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[2].control),
				placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[2].control),
				description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control),
				options 		: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[2].control)                                              
		},
				expressionProperties 	: extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[2].control),
				validators 						: extractFormlyValidators(configurationModel.lines[lineIndex].columns[2].control),
				validation 						: extractFormlyValidation(configurationModel.lines[lineIndex].columns[2].control)                                   
	};
	//////////////////////////////////////////////                  
	//datepicker additionnal particular property  
	//////////////////////////////////////////////                  
	if (configurationModel.lines[lineIndex].columns[2].control.type === 'datepicker') {
		addDatepickerPopupProperty(controlCol2, configurationModel,lineIndex);
	}     

	let FieldGroup = [];

	if (configurationModel.lines[lineIndex].columns[0].control.type === 'header') {
		FieldGroup.push(headerTemplateCol0);
	}else{
		FieldGroup.push(controlCol0);
	}
		
	if (configurationModel.lines[lineIndex].columns[1].control.type === 'header') {
		FieldGroup.push(headerTemplateCol1);
	}else{
		FieldGroup.push(controlCol1);
	}    

	if (configurationModel.lines[lineIndex].columns[2].control.type === 'header') {
		FieldGroup.push(headerTemplateCol2);
	}else{
		FieldGroup.push(controlCol2);
	}    

	formlyModel.push({
		className: 'row', 
		fieldGroup: FieldGroup
	});
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
	addOneColumnHeader,
	addOneColumnControl,
	addTwoColumnControl,
	addThreeColumnControl
	
}; 