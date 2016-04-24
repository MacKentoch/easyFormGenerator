export const IpAdressConfig =       {
	id 													: 'IpAdress',
	name 												: 'IpAdress',
	subtitle 										: 'IpAdress',
	group 											: 'input',
	formlyType									: 'input',
	formlySubtype 							: 'ipadress',
	formlyLabel 								: '',
	formlyRequired 							: false,
	formlyDesciption 						: '',
	formlyOptions 							: [],
	formlyExpressionProperties 	: {},
	formlyValidators 						: {
		ipAddress : {
      expression: function($viewValue, $modelValue) {
        var value = $modelValue || $viewValue;
        return /(\d{1,3}\.){3}\d{1,3}/.test(value);
      },
      message: '$viewValue + " is not a valid IP Address"' //,
      // notLocalHost: '$viewValue !== "127.0.0.1"'
		}
	},
	formlyValidation: {
		messages: {
			required: function(viewValue, modelValue, scope) {
				var defaultReturnMsg 	= 'this IP Adress field is required';
				var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
				if (scope.to.required) return returnMsg;
			}
		}
	}
}
