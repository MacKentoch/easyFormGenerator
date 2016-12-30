export const TextInputConfig =       {
  id                : 'TextInput',
  name              : 'Text input',
  subtitle          : 'Text input',
  group             : 'input',
  formlyType        : 'input',
  formlySubtype     : '',
  formlyLabel       : '',
  formlyRequired    : false,
  formlyDesciption  : '',
  formlyDefaultValue : '',
  formlyOptions     : [] ,
  formlyExpressionProperties: {},
  formlyValidators  : {},
  formlyValidation  : {
    messages: {
      required: function(viewValue, modelValue, scope) {
        //return a required validation message :
        //-> '<label as name> is required '
        //-> or if not exists or empty just 'this field is required'
        var defaultReturnMsg   = 'this Text input field is required';
        var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
        return returnMsg;
      }
    }
  }
};
