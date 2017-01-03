const resetNyaSelect = (nyaSelectObj) => {
  const newNyaSelectObj = {
    controls : [
      {
        id                : 'empty',
        name              : 'no control',
        subtitle          : 'no control',
        group              : 'Blank',
        formlyType        : 'blank',
        formlySubtype      : '',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyOptions      : [] ,
        formlyExpressionProperties: {},
        formlyValidators  : {},
        formlyValidation  : {}
      },

      {
        id                : 'Header',
        name              : 'Header',
        subtitle          : 'no control',
        group              : 'Decoration',
        formlyType        : 'header',
        formlySubtype      : '',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyOptions      : [] ,
        formlyExpressionProperties: {},
        formlyValidators  : {},
        formlyValidation  : {}
      },

      {
        id                : 'Subtitle',
        name              : 'Subtitle',
        subtitle          : 'no control',
        group              : 'Decoration',
        formlyType        : 'subTitle',
        formlySubtype      : '',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyOptions      : [] ,
        formlyExpressionProperties: {},
        formlyValidators  : {},
        formlyValidation  : {}
      },

      {
        id                : 'TextInput',
        name              : 'Text input',
        subtitle          : 'Text input',
        group              : 'input',
        formlyType        : 'input',
        formlySubtype      : '',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyOptions      : [] ,
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
      },

      {
        id                : 'Password',
        name              : 'Password',
        subtitle          : 'Password',
        group              : 'input',
        formlyType        : 'input',
        formlySubtype      : 'password',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyOptions      : [] ,
        formlyExpressionProperties: {},
        formlyValidators  : {},
        formlyValidation  : {
          messages: {
            required: (viewValue, modelValue, scope) => {
              //return a required validation message :
              //-> '<label as name> is required '
              //-> or if not exists or empty just 'this field is required'
              var defaultReturnMsg   = 'this Password field is required';
              var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
              return returnMsg;
            }
          }
        }
    },

      {
        id                           : 'Email',
        name                         : 'Email',
        subtitle                     : 'Email',
        group                       : 'input',
        formlyType                  : 'input',
        formlySubtype               : 'email',
        formlyLabel                 : '',
        formlyRequired               : false,
        formlyDesciption             : '',
        formlyOptions               : [],
        formlyExpressionProperties   : {},
        formlyValidators             : {
          emailShape : {
            expression : (viewValue, modelValue) => {
              var value = modelValue || viewValue;
              return /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/.test(value);
            },
            message    : '$viewValue + \' is not a valid email\''
          }
        },
        formlyValidation: {
          messages: {
            required: function(viewValue, modelValue, scope) {
              //return a required validation message :
              //-> '<label as name> is required '
              //-> or if not exists or empty just 'this field is required'
              var defaultReturnMsg   = 'this Email field is required';
              var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
              //check if validation is really dued to require validation
              //and not another validation like emailShape validator
              if (scope.to.required) return returnMsg;
            }
          }
        }
      },

      {
        id                           : 'IpAdress',
        name                         : 'IpAdress',
        subtitle                     : 'IpAdress',
        group                       : 'input',
        formlyType                  : 'input',
        formlySubtype               : 'ipadress',
        formlyLabel                 : '',
        formlyRequired               : false,
        formlyDesciption             : '',
        formlyOptions               : [],
        formlyExpressionProperties   : {},
        formlyValidators             : {
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
              var defaultReturnMsg   = 'this IP Adress field is required';
              var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
              if (scope.to.required) return returnMsg;
            }
          }
        }
      },


      {
        id                : 'Date',
        name              : 'Date',
        subtitle          : 'Date',
        group              : 'input',
        formlyType        : 'datepicker',
        formlySubtype      : '',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyOptions      : [],
        datepickerOptions  : 'dd-MMMM-yyyy',
        formlyExpressionProperties: {},
        formlyValidators  : {},
        formlyValidation  : {
          messages: {
            required: function(viewValue, modelValue, scope) {
              //return a required validation message :
              //-> '<label as name> is required '
              //-> or if not exists or empty just 'this field is required'
              var defaultReturnMsg   = 'this Date field is required';
              var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
              return returnMsg;
            }
          }
        }
      },

      {
        id                : 'Texarea',
        name              : 'Textarea',
        subtitle          : 'Textarea',
        group              : 'Textarea',
        formlyType        : 'textarea',
        formlySubtype      : '',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyOptions      : [],
        formlyExpressionProperties: {},
        formlyValidators  : {},
        formlyValidation  : {
          messages  : {
            required: function(viewValue, modelValue, scope) {
              //return a required validation message :
              //-> '<label as name> is required '
              //-> or if not exists or empty just 'this field is required'
              var defaultReturnMsg   = 'this Textarea field is required';
              var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
              return returnMsg;
            }
          }
        }
      },

      {
        id                : 'RichTextEditor',
        name              : 'RichTextEditor',
        subtitle          : 'RichTextEditor',
        group              : 'Textarea',
        formlyType        : 'richEditor',
        formlySubtype      : '',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyOptions      : [],
        formlyExpressionProperties: {},
        formlyValidators           : {},
        formlyValidation  : {
          messages: {
            required: function(viewValue, modelValue, scope) {
              //return a required validation message :
              //-> '<label as name> is required '
              //-> or if not exists or empty just 'this field is required'
              var defaultReturnMsg  = 'this RichTextEditor field is required';
              var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
              return returnMsg;
            }
          }
        }
      },

      {
        id                : 'Radio',
        name              : 'Radio',
        subtitle          : 'Radio',
        options            : [],
        group              : 'Radio',
        formlyType        : 'radio',
        formlySubtype      : '',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '' ,
        formlyOptions      : [],
        formlyExpressionProperties: {},
        formlyValidators  : {},
        formlyValidation  : {
          messages: {
            required: function(viewValue, modelValue, scope) {
              //return a required validation message :
              //-> '<label as name> is required '
              //-> or if not exists or empty just 'this field is required'
              var defaultReturnMsg   = 'this Password field is required';
              var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
              return returnMsg;
            }
          }
        }
      },

      {
        id                : 'Checkbox',
        name              : 'Checkbox',
        subtitle          : 'Checkbox',
        group              : 'Checkbox',
        formlyType        : 'checkbox',
        formlySubtype      : '',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyOptions      : [],
        formlyExpressionProperties: {},
        formlyValidators  : {},
        formlyValidation  : {
          messages: {
            required: function(viewValue, modelValue, scope) {
              //return a required validation message :
              //-> '<label as name> is required '
              //-> or if not exists or empty just 'this field is required'
              var defaultReturnMsg   = 'this Checkbox field is required';
              var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
              return returnMsg;
            }
          }
        }
      },

      {
        id                : 'BasicSelect',
        name              : 'Basic select',
        subtitle          : 'Basic select',
        options            : [],
        group              : 'Select',
        formlyType        : 'basicSelect',
        formlySubtype      : '',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyOptions      : [],
        formlyExpressionProperties: {},
        formlyValidators  : {},
        formlyValidation  : {
          messages: {
            required: function(viewValue, modelValue, scope) {
              //return a required validation message :
              //-> '<label as name> is required '
              //-> or if not exists or empty just 'this field is required'
              var defaultReturnMsg   = 'this Basic select field is required';
              var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
              return returnMsg;
            }
          }
        }
      },

      {
        id                : 'GroupedSelect',
        name              : 'Grouped Select',
        subtitle          : 'Grouped Select',
        options            : [],
        group              : 'Select',
        formlyType        : 'groupedSelect',
        formlySubtype      : '',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyOptions      : [],
        formlyExpressionProperties: {},
        formlyValidators  : {},
        formlyValidation  : {
          messages        : {
            required  : function(viewValue, modelValue, scope) {
              //return a required validation message :
              //-> '<label as name> is required '
              //-> or if not exists or empty just 'this field is required'
              var defaultReturnMsg   = 'this Grouped Select field is required';
              var returnMsg         = (typeof scope.to.label !== 'undefined') ? ((scope.to.label !== '') ? scope.to.label + ' is required' : defaultReturnMsg) : defaultReturnMsg;
              return returnMsg;
            }
          }
        }
      }
      ],
      selectedControl : 'none' ,
      temporyConfig   : {
        selectedControl    : 'none',
        formlyLabel        : '',
        formlyRequired    : false,
        formlyDesciption  : '',
        formlyDefaultValue : '',
        formlyPlaceholder  : '',
        formlyOptions     : [],
        //expressions/validation fields
        formlyExpressionProperties: {},
        formlyValidators  : {},
        formlyValidation  : {}
      }

  };

  //reset
  angular.copy(newNyaSelectObj, nyaSelectObj);
  return true;
};


const getResetConfig = () => {
  return {
    formlyLabel: '',
    formlyRequired: false,
    formlyPlaceholder: '',
    formlyDesciption: '',
    formlyDefaultValue: '',
    formlyOptions: []
  };
};

/**
  * data passed back to parent controller
  * after control being finsihed editing in modal
  */
const returnControlFromAddCtrlModalModel = (CtrlModalModel) =>{
  if (CtrlModalModel && CtrlModalModel.selectedControl && Array.isArray(CtrlModalModel.controls)) {
    const selectedControl = CtrlModalModel.selectedControl;
    const controlRef = CtrlModalModel.controls.find(control => control.id === selectedControl);
    // return a deep copy of selected control:
    if (controlRef) {
      const returnCtrl = {
        selectedControl: selectedControl ,
        formlyType : controlRef.formlyType,
        formlySubtype: controlRef.formlySubtype,
        formlyLabel: controlRef.formlyLabel,
        formlyRequired : controlRef.formlyRequired,
        formlyDesciption: controlRef.formlyDesciption,
        formlyPlaceholder: controlRef.formlyPlaceholder,
        formlyOptions: [...controlRef.formlyOptions],
        //validation fields
        formlyExpressionProperties: angular.copy(controlRef.formlyExpressionProperties),
        formlyValidators: angular.copy(controlRef.formlyExpressionProperties),
        formlyValidation: angular.copy(controlRef.formlyExpressionProperties)
      };
      // particular case: date picker needs an additional property
      if (controlRef.formlyType === 'datepicker') {
        returnCtrl.datepickerOptions = controlRef.datepickerOptions;
      }
      return returnCtrl;
    }
  }
  // by default: returns an empty control object:
  return {
    selectedControl: 'none',
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
};


/**
  * validKeyUniqueness
  * to be sure the "keys" are unique (in same formly field model)
  */
const validKeyUniqueness = (thisKey, configurationObj) => {
  const lines = configurationObj.lines;
  return !lines
              .map(line => line.columns.some(column => column.control.key === thisKey))
              .reduce((prev, next) => prev || next, false);
};

export {
  resetNyaSelect,
  returnControlFromAddCtrlModalModel,
  validKeyUniqueness,
  getResetConfig

};
