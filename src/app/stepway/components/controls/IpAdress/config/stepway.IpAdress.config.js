export const IpAdressConfig =       {
  id: 'IpAdress',
  name: 'IpAdress',
  subtitle: 'IpAdress',
  group: 'input',
  formlyType: 'input',
  formlySubtype: 'ipadress',
  formlyLabel: '',
  formlyRequired: false,
  formlyDescription: '',
  formlyOptions: [],
  formlyExpressionProperties: {},
  formlyValidators: {
  ipAddress : {
    expression: ($viewValue, $modelValue) => {
      const value = $modelValue || $viewValue;
      return /(\d{1,3}\.){3}\d{1,3}/.test(value);
    },
    message: '$viewValue + " is not a valid IP Address"'
  }
  },
    formlyValidation: {
    messages: {
      required: (viewValue, modelValue, scope) => {
        const defaultReturnMsg = 'this IP Adress field is required';
        const returnMsg = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
        if (scope.to.required) return returnMsg;
      }
    }
  }
};
