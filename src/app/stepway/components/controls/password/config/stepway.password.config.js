export const PasswordConfig =       {
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
      required: (viewValue, modelValue, scope) => {
        //return a required validation message :
        //-> '<label as name> is required '
        //-> or if not exists or empty just 'this field is required'
        var defaultReturnMsg 	= 'this Password field is required';
        var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
        return returnMsg;
      }
    }
  }
};
