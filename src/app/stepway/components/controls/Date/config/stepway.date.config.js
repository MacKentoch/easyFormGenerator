export const DateConfig = 			{
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
	datepickerOptions	: 'dd-MMMM-yyyy',
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
};
