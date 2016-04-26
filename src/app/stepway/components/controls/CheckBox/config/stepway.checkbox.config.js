export const CheckBoxConfig = {
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
        var defaultReturnMsg 	= 'this Checkbox field is required';
        var returnMsg 				= (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
        return returnMsg;
      }
    }
  }
};
