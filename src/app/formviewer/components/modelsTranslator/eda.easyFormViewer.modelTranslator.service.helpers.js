/* global angular */

const resetNyaSelect = (nyaSelectObj) => {

	let newNyaSelectObj = {
		controls : [
			{
				id								: 'empty',
				name							: 'no control',
				subtitle					: 'no control',
				group							: 'Blank',
				formlyType				: 'blank',
				formlySubtype			: '',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyOptions			: [] ,
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {}
			},

			{
				id								: 'Header',
				name							: 'Header',
				subtitle					: 'no control',
				group							: 'Decoration',
				formlyType				: 'header',
				formlySubtype			: '',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyOptions			: [] ,
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {}
			},

			{
				id								: 'Subtitle',
				name							: 'Subtitle',
				subtitle					: 'no control',
				group							: 'Decoration',
				formlyType				: 'subTitle',
				formlySubtype			: '',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyOptions			: [] ,
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {}
			},

			{
				id								: 'TextInput',
				name							: 'Text input',
				subtitle					: 'Text input',
				group							: 'input',
				formlyType				: 'input',
				formlySubtype			: '',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyOptions			: [] ,
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {
					messages: {
						required: function(viewValue, modelValue, scope) {
							//return a required validation message :
							//-> '<label as name> is required '
							//-> or if not exists or empty just 'this field is required'
							var defaultReturnMsg 	= 'this Text input field is required';
							var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
							return returnMsg;
						}
					}
				}
			},

			{
				id								: 'Password',
				name							: 'Password',
				subtitle					: 'Password',
				group							: 'input',
				formlyType				: 'input',
				formlySubtype			: 'password',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyOptions			: [] ,
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {
					messages: {
						required: function(viewValue, modelValue, scope) {
							//return a required validation message :
							//-> '<label as name> is required '
							//-> or if not exists or empty just 'this field is required'
							var defaultReturnMsg 	= 'this Password field is required';
							var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
							return returnMsg;
						}
					}
				}
		},

			{
				id 													: 'Email',
				name 												: 'Email',
				subtitle 										: 'Email',
				group 											: 'input',
				formlyType									: 'input',
				formlySubtype 							: 'email',
				formlyLabel 								: '',
				formlyRequired 							: false,
				formlyDescription 						: '',
				formlyOptions 							: [],
				formlyExpressionProperties 	: {},

				formlyValidators 						: {
					emailShape : {
						expression : function(viewValue, modelValue) {
							var value = modelValue || viewValue;
							return /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/.test(value);
						},
						message		: '$viewValue + \' is not a valid email\''
					}
				},
				formlyValidation: {
					messages: {
						required: function(viewValue, modelValue, scope) {
							//return a required validation message :
							//-> '<label as name> is required '
							//-> or if not exists or empty just 'this field is required'
							var defaultReturnMsg 	= 'this Email field is required';
							var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
							//check if validation is really dued to require validation
							//and not another validation like emailShape validator
							if (scope.to.required) return returnMsg;
						}
					}
				}
			},

			{
				id								: 'Date',
				name							: 'Date',
				subtitle					: 'Date',
				group							: 'input',
				formlyType				: 'datepicker',
				formlySubtype			: '',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyOptions			: [],
				datepickerOptions	: {format : 'dd-MMMM-yyyy'},
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {
					messages: {
						required: function(viewValue, modelValue, scope) {
							//return a required validation message :
							//-> '<label as name> is required '
							//-> or if not exists or empty just 'this field is required'
							var defaultReturnMsg 	= 'this Date field is required';
							var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
							return returnMsg;
						}
					}
				}
			},

			{
				id								: 'Texarea',
				name							: 'Textarea',
				subtitle					: 'Textarea',
				group							: 'Textarea',
				formlyType				: 'textarea',
				formlySubtype			: '',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyOptions			: [],
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {
					messages	: {
						required: function(viewValue, modelValue, scope) {
							//return a required validation message :
							//-> '<label as name> is required '
							//-> or if not exists or empty just 'this field is required'
							var defaultReturnMsg 	= 'this Textarea field is required';
							var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
							return returnMsg;
						}
					}
				}
			},

			{
				id								: 'RichTextEditor',
				name							: 'RichTextEditor',
				subtitle					: 'RichTextEditor',
				group							: 'Textarea',
				formlyType				: 'richEditor',
				formlySubtype			: '',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyOptions			: [],
				formlyExpressionProperties: {},
				formlyValidators 					: {},
				formlyValidation	: {
					messages: {
						required: function(viewValue, modelValue, scope) {
							//return a required validation message :
							//-> '<label as name> is required '
							//-> or if not exists or empty just 'this field is required'
							var defaultReturnMsg	= 'this RichTextEditor field is required';
							var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
							return returnMsg;
						}
					}
				}
			},

			{
				id								: 'Radio',
				name							: 'Radio',
				subtitle					: 'Radio',
				options						: [],
				group							: 'Radio',
				formlyType				: 'radio',
				formlySubtype			: '',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '' ,
				formlyOptions			: [],
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {
					messages: {
						required: function(viewValue, modelValue, scope) {
							//return a required validation message :
							//-> '<label as name> is required '
							//-> or if not exists or empty just 'this field is required'
							var defaultReturnMsg 	= 'this Password field is required';
							var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
							return returnMsg;
						}
					}
				}
			},

			{
				id								: 'Checkbox',
				name							: 'Checkbox',
				subtitle					: 'Checkbox',
				group							: 'Checkbox',
				formlyType				: 'checkbox',
				formlySubtype			: '',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyOptions			: [],
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {
					messages: {
						required: function(viewValue, modelValue, scope) {
							//return a required validation message :
							//-> '<label as name> is required '
							//-> or if not exists or empty just 'this field is required'
							var defaultReturnMsg 	= 'this Checkbox field is required';
							var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
							return returnMsg;
						}
					}
				}
			},

			{
				id								: 'BasicSelect',
				name							: 'Basic select',
				subtitle					: 'Basic select',
				options						: [],
				group							: 'Select',
				formlyType				: 'basicSelect',
				formlySubtype			: '',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyOptions			: [],
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {
					messages: {
						required: function(viewValue, modelValue, scope) {
							//return a required validation message :
							//-> '<label as name> is required '
							//-> or if not exists or empty just 'this field is required'
							var defaultReturnMsg 	= 'this Basic select field is required';
							var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
							return returnMsg;
						}
					}
				}
			},

			{
				id								: 'GroupedSelect',
				name							: 'Grouped Select',
				subtitle					: 'Grouped Select',
				options						: [],
				group							: 'Select',
				formlyType				: 'groupedSelect',
				formlySubtype			: '',
				formlyLabel				: '',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyOptions			: [],
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {
					messages				: {
						required	: function(viewValue, modelValue, scope) {
							//return a required validation message :
							//-> '<label as name> is required '
							//-> or if not exists or empty just 'this field is required'
							var defaultReturnMsg 	= 'this Grouped Select field is required';
							var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
							return returnMsg;
						}
					}
				}
			}
			],
			selectedControl : 'none' ,
			temporyConfig 	: {
				selectedControl		: 'none',
				formlyLabel				: 'label',
				formlyRequired		: false,
				formlyDescription	: '',
				formlyPlaceholder	: '',
				formlyOptions 		: [],
				//expressions/validation fields
				formlyExpressionProperties: {},
				formlyValidators	: {},
				formlyValidation	: {}
			}

	};

	//reset
	angular.copy(newNyaSelectObj, nyaSelectObj);
	return true;
};

/**
	* equivalent to formFielManage service in easy form generator
	*/
const getConfigurationModelInit = () => {
	let configurationModelInit = {
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
																			key: 'none'
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
	return configurationModelInit;
};

const getEmptyConfigModelResult = () => {
	let configurationModelResult = {
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
	return angular.copy(configurationModelResult);
};



const resetDataModel = (obj) => {
	let emptyDataModel = {};
	angular.copy(emptyDataModel, obj);
	return true;
};


const getErrorObject = (errorTitle, errorMessage) => {
	let messageObj = {
		noError : false,
		title		: '',
		Message	: ''
	};
	messageObj.noError	= false;
	messageObj.title 		= errorTitle;
	messageObj.Message 	= errorMessage;
	return messageObj;
};

const getMessageObject = (messageTitle, messageBody) => {
	let messageObj = {
		noError 	: false,
		title			: '',
		Message		: ''
	};
	messageObj.noError	= true;
	messageObj.title 		= messageTitle;
	messageObj.Message 	= messageBody;
	return messageObj;
};

const resetFormlyModel = (formlyModel) => {
	var resetformly = [];
	angular.copy(resetformly, formlyModel);
};

const extractTemplateOptionDescription = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.description !== 'undefined'? obj.templateOptions.description: '') : '';

const extractTemplateOptionPlaceholder = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.placeholder !== 'undefined'? obj.templateOptions.placeholder: '') : '';

const extractTemplateOptionType = (obj) => typeof obj.subtype !== 'undefined'? obj.subtype: '';

// const isTemplateOptionDefined = (obj) => typeof obj.templateOptions !== 'undefined' ? true : false;

const extractTemplateOptionLabel = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.label !== 'undefined'? obj.templateOptions.label: '') : '';

const extractTemplateOptionDatepickerOptions = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.datepickerOptions !== 'undefined'? angular.copy(obj.templateOptions.datepickerOptions) : '') : '';

const extractFormlyExpressionProperties = (obj) => typeof obj.formlyExpressionProperties !== 'undefined' ? angular.copy(obj.formlyExpressionProperties) : {};

const extractFormlyValidators = (obj) => typeof obj.formlyValidators !== 'undefined' ? angular.copy(obj.formlyValidators): {};

const extractFormlyValidation = (obj) => typeof obj.formlyValidation !== 'undefined' ?  angular.copy(obj.formlyValidation) : {};

const extractTemplateOptionRequired = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.required !== 'undefined'? obj.templateOptions.required: '') : '';

const extractTemplateOptionOptions = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.options !== 'undefined'? obj.templateOptions.options: '') : '';

const addDatepickerOptionsProperty = (fieldToPush, configurationModel,lineIndex) => fieldToPush.templateOptions.datepickerOptions = extractTemplateOptionDatepickerOptions(configurationModel.lines[lineIndex].columns[0].control);


const addOneColumnHeader = (formlyModel, configurationModel,lineIndex) => {
	/**
		* text header is stored in "description" in templateOtion model
		*/
	let headerTemplateCol0 = `<div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control)}<h2></div></div><hr/>`;
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
};


const addOneColumnControl = (formlyModel, configurationModel,lineIndex) => {
	let fieldToPush = {
		className	: 'col-xs-12',
		type	: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
		key		: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
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
	if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') addDatepickerOptionsProperty(fieldToPush, configurationModel,lineIndex);

	formlyModel.push(fieldToPush);
};



const addTwoColumnControl = (formlyModel, configurationModel,lineIndex) => {

	//text header is stored in "description" in templateOtion model
	let headerTemplateCol0 = {
		className: 'col-xs-6',
		template : `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control)}<h2><hr/></div></div>`
	};

	let headerTemplateCol1 = {
		className: 'col-xs-6',
		template : `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control)}<h2><hr/></div></div>`
	};

	let controlCol0 = {
		className	: 'col-xs-6',
		type			: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
		key				: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
		templateOptions: {
				type				: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
				label				: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
				required 		: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
				placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
				description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
				options 		: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
		},
				expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
				validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
				validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
		};
	//////////////////////////////////////////////
	//datepicker additionnal particular property
	//////////////////////////////////////////////
	if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') addDatepickerOptionsProperty(controlCol0, configurationModel,lineIndex);

	let controlCol1 =  {
		className	: 'col-xs-6',
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
				expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
				validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
				validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)
		};

	//////////////////////////////////////////////
	//datepicker additionnal particular property
	//////////////////////////////////////////////
	if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') addDatepickerOptionsProperty(controlCol1, configurationModel,lineIndex);

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
		className	: 'row',
		fieldGroup: FieldGroup
	});

};


const addThreeColumnControl = (formlyModel, configurationModel,lineIndex) => {
	//text header is stored in "description" in templateOtion model
	let headerTemplateCol0 =  {
		className	: 'col-xs-4',
		template 	: `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control)}<h2><hr/></div></div>`
	};

	let headerTemplateCol1 =  {
		className	: 'col-xs-4',
		template	: `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control)}<h2><hr/></div></div>`
	};

	let headerTemplateCol2 =  {
		className	: 'col-xs-4',
		template	: `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control)}<h2><hr/></div></div>`
	};

	var controlCol0 =     {
			className	: 'col-xs-4',
			type			: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
			key				: typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
			templateOptions: {
					type				: extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
					label				: extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
					required 		: extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
					placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
					description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
					options 		: extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
			},
					expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
					validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
					validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
		};
	//////////////////////////////////////////////
	//datepicker additionnal particular property
	//////////////////////////////////////////////
	if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') addDatepickerOptionsProperty(controlCol0, configurationModel,lineIndex);

	let controlCol1 =  {
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
					expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
					validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
					validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)
		};
	//////////////////////////////////////////////
	//datepicker additionnal particular property
	//////////////////////////////////////////////
	if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') addDatepickerOptionsProperty(controlCol1, configurationModel,lineIndex);

	let controlCol2 =  {
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
					expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[2].control),
					validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[2].control),
					validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[2].control)
		};
	//////////////////////////////////////////////
	//datepicker additionnal particular property
	//////////////////////////////////////////////
	if (configurationModel.lines[lineIndex].columns[2].control.type === 'datepicker') addDatepickerOptionsProperty(controlCol2, configurationModel,lineIndex);

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

};





export {
	resetNyaSelect,
	getConfigurationModelInit,
	getEmptyConfigModelResult,
	resetDataModel,
	getErrorObject,
	getMessageObject,
	resetFormlyModel,
	addOneColumnHeader,
	addOneColumnControl,
	addTwoColumnControl,
	addThreeColumnControl
};
