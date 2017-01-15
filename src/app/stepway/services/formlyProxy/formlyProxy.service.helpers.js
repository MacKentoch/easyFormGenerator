const configurationModelInit = {
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
  configStepCounter: 0,
  submitButtonText: 'submit',
  cancelButtonText: 'cancel',
  lines: [
    {
      line: 1,
      activeColumn: 1,
      columns        : [{
        numColumn: 1,
        exist:true,
        control: {
          type:'none',
          key: 'none' // ,
          // templateOptions: {
          //   label: 'none',
          //   placeholder: 'none',
          //   required: false,
          //   description: 'Descriptive text'
          // }
          }
        }
      ]
    }
  ]
};

const configurationModelResult = {
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
  configStepCounter: 0,
  submitButtonText: 'submit',
  cancelButtonTex: 'cancel',
  lines: []
};

const isTemplateOptionDefined = (obj) => {
  const defaultValue = false;
  if (obj && obj.templateOptions) {
    return true;
  }
  return defaultValue;
};

const extractTemplateOptionLabel = (obj) => {
  const defaultValue = '';
  if (isTemplateOptionDefined(obj) && obj.templateOptions.label) {
    return obj.templateOptions.label;
  }
  return defaultValue;
};

const extractTemplateOptionDatepickerOptions= (obj) => {
  const defaultValue = { format: '' };
  if (isTemplateOptionDefined(obj) && obj.templateOptions.datepickerOptions) {
    return {...obj.templateOptions.datepickerOptions};
  }
  return defaultValue;
};

const extractTemplateOptionRequired = (obj) => {
  const defaultValue = false;
  if (isTemplateOptionDefined(obj) && obj.templateOptions.required) {
    return true;
  }
  return defaultValue;
};

const extractTemplateOptionOptions = (obj) => {
  const defaultValue = '';
  if (isTemplateOptionDefined(obj) && obj.templateOptions.options) {
    return obj.templateOptions.options;
  }
  return defaultValue;
};

const extractTemplateOptionType = (obj) => {
  const defaultValue = '';
  if (obj && obj.subtype) {
    return obj.subtype;
  }
  return defaultValue;
};

const extractTemplateOptionPlaceholder = (obj) => {
  const defaultValue = '';
  if (isTemplateOptionDefined(obj) && obj.templateOptions.placeholder) {
    return obj.templateOptions.placeholder;
  }
  return defaultValue;
};

const extractTemplateOptionDescription = (obj) => {
  const defaultValue = '';
  if (isTemplateOptionDefined(obj) && obj.templateOptions.description) {
    return obj.templateOptions.description;
  }
  return defaultValue;
};

const extractDefaultValue = (obj) => {
  const defaultValue = '';
  if (obj && obj.defaultValue) {
    return obj.defaultValue;
  }
  return defaultValue;
};

const extractFormlyExpressionProperties = (obj) => {
  const defaultValue = {};
  if (obj && obj.formlyExpressionProperties) {
    return angular.copy(obj.formlyExpressionProperties);
  }
  return defaultValue;
};

const extractFormlyValidators = (obj) => {
  const defaultValue = {};
  if (obj && obj.formlyValidators) {
    return angular.copy(obj.formlyValidators);
  }
  return defaultValue;
};

const extractFormlyValidation = (obj) => {
  const defaultValue = {};
  if (obj && obj.formlyValidation) {
    return angular.copy(obj.formlyValidation);
  }
  return defaultValue;
};

const addDatepickerOptionsProperty = (fieldToPush, configurationModel, lineIndex) => {
  const control = {...configurationModel.lines[lineIndex].columns[0].control};
  fieldToPush.templateOptions.datepickerOptions = extractTemplateOptionDatepickerOptions(control);
};

// const addOneColumnHeader = (formlyModel, configurationModel, lineIndex) => {
//   const control = { ...configurationModel.lines[lineIndex].columns[0].control };
//   const defaultTemplate = '<div></div>';
//   const headerTemplateCol0 =  {
//     template : `
//     <div class="row">
//       <div class="">
//         <h2 class="text-center">
//           ${extractTemplateOptionDescription(control)}
//         </h2>
//         <hr/>
//       </div>
//     </div>
//     `
//   };
//   if (control.type && control.type  === 'header') {
//     return formlyModel.push({
//       template: headerTemplateCol0.template
//     });
//   }
//   return formlyModel.push({
//     template : defaultTemplate
//   });
// };

const addOneColumnControl = (formlyModel, configurationModel,lineIndex) => {
  const control = { ...configurationModel.lines[lineIndex].columns[0].control };
  const fieldToPush = {
    className: 'col-xs-12',
    type: control && control.type && control.type !== 'none' ? control.type : 'blank',
    key: control && control.key ? control.key : 'blank' + Date.now(),
    templateOptions: {
      type: extractTemplateOptionType(control),
      label: extractTemplateOptionLabel(control),
      required: extractTemplateOptionRequired(control),
      placeholder: extractTemplateOptionPlaceholder(control),
      description: extractTemplateOptionDescription(control),
      options: extractTemplateOptionOptions(control)
    },
    defaultValue: extractDefaultValue(control),
    expressionProperties: extractFormlyExpressionProperties(control),
    validators: extractFormlyValidators(control),
    validation: extractFormlyValidation(control)
  };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (control.type === 'datepicker') {
    addDatepickerOptionsProperty(fieldToPush, configurationModel, lineIndex);
  }
  formlyModel.push(fieldToPush);
};

const addTwoColumnControl = (formlyModel, configurationModel,lineIndex) => {
  const control0 = { ...configurationModel.lines[lineIndex].columns[0].control };
  //text header is stored in "description" in templateOtion model
  const headerTemplateCol0 =  {
    className: 'col-xs-6',
    template: `
    <div class="row">
      <div class="">
        <h2 class="text-center">
          ${extractTemplateOptionDescription(control0)}
        </h2>
        <hr/>
      </div>
    </div>
  `
  };
  const controlCol0 = {
    className: 'col-xs-6',
    type: control0 && control0.type && control0.type !== 'none' ? control0.type:  'blank',
    key: control0 && control0.key ? control0.key: 'blank' + Date.now(),
    templateOptions: {
      type: extractTemplateOptionType(control0),
      label: extractTemplateOptionLabel(control0),
      required: extractTemplateOptionRequired(control0),
      placeholder: extractTemplateOptionPlaceholder(control0),
      description: extractTemplateOptionDescription(control0),
      options: extractTemplateOptionOptions(control0)
    },
    defaultValue: extractDefaultValue(control0),
    expressionProperties: extractFormlyExpressionProperties(control0),
    validators: extractFormlyValidators(control0),
    validation: extractFormlyValidation(control0)
  };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (control0.type === 'datepicker') {
    addDatepickerOptionsProperty(controlCol0, configurationModel, lineIndex);
  }

  const control1 = { ...configurationModel.lines[lineIndex].columns[1].control };
  const headerTemplateCol1 =  {
    className: 'col-xs-6',
    template:`
    <div class="row">
      <div class="">
        <h2 class="text-center">
          ${extractTemplateOptionDescription(control1)}
        </h2>
        <hr/>
      </div>
    </div>
  `
  };
  const controlCol1 =  {
    className: 'col-xs-6',
    type: control1 && control1.type && control1.type !== 'none' ? control1.type : 'none',
    key: control1 && control1.key ? control1.key : 'blank' + Date.now(),
    templateOptions: {
      type: extractTemplateOptionType(control1),
      label: extractTemplateOptionLabel(control1),
      required: extractTemplateOptionRequired(control1),
      placeholder: extractTemplateOptionPlaceholder(control1),
      description: extractTemplateOptionDescription(control1),
      options: extractTemplateOptionOptions(control1)
    },
    defaultValue: extractDefaultValue(control1),
    expressionProperties: extractFormlyExpressionProperties(control1),
    validators: extractFormlyValidators(control1),
    validation: extractFormlyValidation(control1)
  };
  //////////////////////////////////////////////
  // datepicker additionnal particular property
  //////////////////////////////////////////////
  if (control1.type === 'datepicker') {
    addDatepickerOptionsProperty(controlCol1, configurationModel, lineIndex);
  }

  const FieldGroup = [];

  if (control0.type === 'header') {
   FieldGroup.push(headerTemplateCol0);
  } else {
   FieldGroup.push(controlCol0);
  }

  if (control1.type === 'header') {
   FieldGroup.push(headerTemplateCol1);
  } else {
   FieldGroup.push(controlCol1);
  }

  formlyModel.push({
    className: 'row',
    fieldGroup: FieldGroup
  });
};


const addThreeColumnControl = (formlyModel, configurationModel,lineIndex) => {
  const control0 = { ...configurationModel.lines[lineIndex].columns[0].control };
  //text header is stored in "description" in templateOtion model
  const headerTemplateCol0 =  {
    className: 'col-xs-4',
    template : `
    <div class="row">
      <div class="">
        <h2 class="text-center">
          ${extractTemplateOptionDescription(control0)}
        </h2>
        <hr/>
      </div>
    </div>
    `
  };
  const controlCol0 =  {
    className: 'col-xs-4',
    type: control0 && control0.type && control0.type !== 'none' ? control0.type:  'blank',
    key: control0 && control0.key ? control0.key: 'blank' + Date.now(),
    templateOptions: {
      type: extractTemplateOptionType(control0),
      label: extractTemplateOptionLabel(control0),
      required: extractTemplateOptionRequired(control0),
      placeholder: extractTemplateOptionPlaceholder(control0),
      description: extractTemplateOptionDescription(control0),
      options: extractTemplateOptionOptions(control0)
    },
    defaultValue: extractDefaultValue(control0),
    expressionProperties: extractFormlyExpressionProperties(control0),
    validators: extractFormlyValidators(control0),
    validation: extractFormlyValidation(control0)
  };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (control0.type === 'datepicker') {
  addDatepickerOptionsProperty(controlCol0, configurationModel,lineIndex);
  }

  const control1 = { ...configurationModel.lines[lineIndex].columns[1].control };
  const headerTemplateCol1 =  {
    className: 'col-xs-4',
    template:`
    <div class="row">
      <div class="">
        <h2 class="text-center">
          ${extractTemplateOptionDescription(control1)}
        </h2>
        <hr/>
      </div>
    </div>
    `
  };
  const controlCol1 = {
    className: 'col-xs-4',
    type: control1 && control1.type && control1.type !== 'none' ? control1.type:  'blank',
    key: control1 && control1.key ? control1.key: 'blank' + Date.now(),
    templateOptions: {
      type: extractTemplateOptionType(control1),
      label: extractTemplateOptionLabel(control1),
      required: extractTemplateOptionRequired(control1),
      placeholder: extractTemplateOptionPlaceholder(control1),
      description: extractTemplateOptionDescription(control1),
      options: extractTemplateOptionOptions(control1)
    },
    defaultValue: extractDefaultValue(control1),
    expressionProperties: extractFormlyExpressionProperties(control1),
    validators: extractFormlyValidators(control1),
    validation: extractFormlyValidation(control1)
  };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (control1.type === 'datepicker') {
  addDatepickerOptionsProperty(controlCol1, configurationModel,lineIndex);
  }

  const control2 = { ...configurationModel.lines[lineIndex].columns[2].control };
  const headerTemplateCol2 =  {
    className: 'col-xs-4',
    template:`
    <div class="row">
      <div class="">
        <h2 class="text-center">
          ${extractTemplateOptionDescription(control2)}
        </h2>
        <hr/>
      </div>
    </div>
    `
  };
  const controlCol2 = {
    className: 'col-xs-4',
    type: control2 && control2.type && control2.type !== 'none' ? control2.type:  'blank',
    key: control2 && control2.key ? control2.key: 'blank' + Date.now(),
    templateOptions: {
      type: extractTemplateOptionType(control2),
      label: extractTemplateOptionLabel(control2),
      required: extractTemplateOptionRequired(control2),
      placeholder: extractTemplateOptionPlaceholder(control2),
      description: extractTemplateOptionDescription(control2),
      options: extractTemplateOptionOptions(control2)
    },
    defaultValue: extractDefaultValue(control2),
    expressionProperties: extractFormlyExpressionProperties(control2),
    validators: extractFormlyValidators(control2),
    validation: extractFormlyValidation(control2)
  };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (control2.type === 'datepicker') {
  addDatepickerOptionsProperty(controlCol2, configurationModel,lineIndex);
  }

  const FieldGroup = [];

  if (control0.type === 'header') {
    FieldGroup.push(headerTemplateCol0);
  }else{
    FieldGroup.push(controlCol0);
  }

  if (control1.type === 'header') {
    FieldGroup.push(headerTemplateCol1);
  }else{
    FieldGroup.push(controlCol1);
  }

  if (control2.type === 'header') {
    FieldGroup.push(headerTemplateCol2);
  }else{
    FieldGroup.push(controlCol2);
  }

  formlyModel.push({
    className: 'row',
    fieldGroup: FieldGroup
  });
};


const resetDataModel = (obj) => {
  const emptyDataModel = {};
  angular.copy(emptyDataModel, obj);
  return true;
};


const resetFormlyModel = (formlyModel) => {
  const resetformly = [];
  angular.copy(resetformly, formlyModel);
};


export {
  configurationModelInit,
  configurationModelResult,
  resetDataModel,
  resetFormlyModel,

  isTemplateOptionDefined,
  extractTemplateOptionLabel,
  extractTemplateOptionDatepickerOptions,
  extractDefaultValue,
  extractFormlyExpressionProperties,
  extractFormlyValidators,
  extractFormlyValidation,
  extractTemplateOptionRequired,
  extractTemplateOptionOptions,
  extractTemplateOptionType,
  extractTemplateOptionPlaceholder,
  extractTemplateOptionDescription,

  addDatepickerOptionsProperty,
  addOneColumnControl,
  addTwoColumnControl,
  addThreeColumnControl
};
