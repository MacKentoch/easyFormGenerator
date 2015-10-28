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
	return configurationModelInit;                         
}



export {
	resetNyaSelect,
	getConfigurationModelInit
};