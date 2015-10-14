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
				formlyDesciption	: '', 
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
				formlyDesciption	: '', 
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
				formlyDesciption	: '', 
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
				formlyDesciption	: '', 
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
				formlyDesciption	: '', 
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
				formlyDesciption 						: '', 
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
				formlyDesciption	: '', 
				formlyOptions			: [], 
				datepickerPopup		: 'dd-MMMM-yyyy', 
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
				formlyDesciption	: '', 
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
				formlyDesciption	: '', 
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
				formlyDesciption	: '' , 
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
				formlyDesciption	: '', 
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
				formlyDesciption	: '', 
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
				formlyDesciption	: '',
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
				formlyDesciption	: '',
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
}


/**
	* data passed back to parent controller 
	* after control being finsihed editing in modal
	*/
const returnControlFromAddCtrlModalModel = (CtrlModalModel) =>{

	let modelToReturn = {
		selectedControl:'none', 
		formlyType : 'none',
		formlySubtype: 'none',
		formlyLabel: '',
		formlyRequired : false,
		formlyDesciption: '',
		formlyPlaceholder: '',
		formlyOptions: [],
		//validation fields
		formlyExpressionProperties: {},
		formlyValidators: {},
		formlyValidation: {}
	};


	for (let i = CtrlModalModel.controls.length - 1; i >= 0; i--) {
		if (CtrlModalModel.selectedControl === CtrlModalModel.controls[i].id) {
			modelToReturn.selectedControl 		= CtrlModalModel.selectedControl;
			modelToReturn.formlyType 					= CtrlModalModel.controls[i].formlyType;
			modelToReturn.formlySubtype 			= CtrlModalModel.controls[i].formlySubtype;
			modelToReturn.formlyLabel 				= CtrlModalModel.controls[i].formlyLabel;
			modelToReturn.formlyRequired 			= CtrlModalModel.controls[i].formlyRequired;
			modelToReturn.formlyDesciption 		= CtrlModalModel.controls[i].formlyDesciption;
			modelToReturn.formlyPlaceholder 	= CtrlModalModel.controls[i].formlyPlaceholder;
			modelToReturn.formlyOptions 			= CtrlModalModel.controls[i].formlyOptions;

			modelToReturn.formlyExpressionProperties 	= angular.copy(CtrlModalModel.controls[i].formlyExpressionProperties);
			modelToReturn.formlyValidators 						= angular.copy(CtrlModalModel.controls[i].formlyValidators);
			modelToReturn.formlyValidation 						= angular.copy(CtrlModalModel.controls[i].formlyValidation);

			//particular properties 
			//datetpicker format
			if (CtrlModalModel.controls[i].formlyType === 'datepicker') {
				modelToReturn.datepickerPopup = CtrlModalModel.controls[i].datepickerPopup;   
			}
		}
	}
	return modelToReturn;
};


/**
	* validKeyUniqueness
	* to be sure the "keys" are unique (in same formly field model)
	*/
const validKeyUniqueness = (thisKey, configurationObj) => {
	let isUnique = true;
	//each lines
	for (let i = configurationObj.lines.length - 1; i >= 0; i--) {
		//each columns
		for (let j = configurationObj.lines[i].columns.length - 1; j >= 0; j--) {
			if (configurationObj.lines[i].columns[j].control.key === thisKey) {
				isUnique = false;
			}		
		}
	}
	return isUnique;  
}; 


export {
	resetNyaSelect,
	returnControlFromAddCtrlModalModel,
	validKeyUniqueness
	
};