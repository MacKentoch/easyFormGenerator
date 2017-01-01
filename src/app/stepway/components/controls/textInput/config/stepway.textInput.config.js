export const TextInputConfig =       {
<<<<<<< HEAD
  id: 'TextInput',
  name: 'Text input',
  subtitle: 'Text input',
  group: 'input',
  formlyType: 'input',
  formlySubtype: '',
  formlyLabel: '',
  formlyRequired: false,
  formlyDesciption: '',
  formlyOptions: [] ,
  formlyExpressionProperties: {},
  formlyValidators: {},
  formlyValidation: {
=======
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
>>>>>>> fbdefff6f0effc57da00531a7761502a8d304ee2
    messages: {
      required: function(viewValue, modelValue, scope) {
        //return a required validation message :
        //-> '<label as name> is required '
        //-> or if not exists or empty just 'this field is required'
<<<<<<< HEAD
        const defaultReturnMsg   = 'this Text input field is required';
        const returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
=======
        var defaultReturnMsg   = 'this Text input field is required';
        var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
>>>>>>> fbdefff6f0effc57da00531a7761502a8d304ee2
        return returnMsg;
      }
    }
  }
};
