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

const extractFormlyExpressionProperties = (obj) => {
  const defaultValue = {};
  if (obj && obj.formlyExpressionProperties) {
    return {...obj.formlyExpressionProperties};
  }
  return defaultValue;
};

const extractFormlyValidators = (obj) => {
  const defaultValue = {};
  if (obj && obj.formlyValidators) {
    return {...obj.formlyValidators};
  }
  return defaultValue;
};

const extractFormlyValidation = (obj) => {
  const defaultValue = {};
  if (obj && obj.formlyValidation) {
    return {...obj.formlyValidation};
  }
  return defaultValue;
};


const addDatepickerOptionsProperty = (fieldToPush, configurationModel, lineIndex) => {
  const control = {...configurationModel.lines[lineIndex].columns[0].control};
  fieldToPush.templateOptions.datepickerOptions = extractTemplateOptionDatepickerOptions(control);
};

const addOneColumnHeader = (formlyModel, configurationModel, lineIndex) => {
  const control = {...configurationModel.lines[lineIndex].columns[0].control};
  const defaultTemplate = '<div></div>';
  const headerTemplateCol0 =  {
    template : `
    <div class="row">
      <div class="">
        <h2 class="text-center">
          ${extractTemplateOptionDescription(control)}
        </h2>
        <hr/>
      </div>
    </div>
    `
  };
  if (control.type && control.type  === 'header') {
    return formlyModel.push({
      template: headerTemplateCol0.template
    });
  }
  return formlyModel.push({
    template : defaultTemplate
  });
};

const addOneColumnControl = (formlyModel, configurationModel,lineIndex) => {
  const control = {...configurationModel.lines[lineIndex].columns[0].control};
  const fieldToPush = {
    className: 'col-xs-12',
    type: control.type && control.type !== 'none' ? control.type : 'blank',
    key: control.key ?  control.key : 'blank' + Date.now(),
    templateOptions: {
      type: extractTemplateOptionType(control),
      label: extractTemplateOptionLabel(control),
      required: extractTemplateOptionRequired(control),
      placeholder: extractTemplateOptionPlaceholder(control),
      description: extractTemplateOptionDescription(control),
      options: extractTemplateOptionOptions(control)
    },
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

  //text header is stored in "description" in templateOtion model
  const headerTemplateCol0 =  {
  className: 'col-xs-6',
  template : `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control)}<h2><hr/></div></div>`
  };

  const headerTemplateCol1 =  {
  className: 'col-xs-6',
  template:`<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control)}<h2><hr/></div></div>`
  };

  const controlCol0 =     {
  className: 'col-xs-6',
  type: typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
  key  : typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
  templateOptions: {
  type          : extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
  label          : extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
  required       : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
  placeholder   : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
  description   : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
  options       : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
  },
  expressionProperties   : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
  validators             : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
  validation             : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
  };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
  addDatepickerOptionsProperty(controlCol0, configurationModel,lineIndex);
  }

  const controlCol1 =  {
  className: 'col-xs-6',
  type      : typeof configurationModel.lines[lineIndex].columns[1].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[1].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[1].control.type) : 'blank',
  key        : typeof configurationModel.lines[lineIndex].columns[1].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[1].control.key : 'blank' + Date.now(),
  templateOptions  : {
  type        : extractTemplateOptionType(configurationModel.lines[lineIndex].columns[1].control),
  label        : extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[1].control),
  required     : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[1].control),
  placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[1].control),
  description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control),
  options     : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[1].control)
  },
  expressionProperties   : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
  validators             : extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
  validation             : extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)
  };

  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') {
  addDatepickerOptionsProperty(controlCol1, configurationModel,lineIndex);
  }

  const FieldGroup = [];

  if (configurationModel.lines[lineIndex].columns[0].control.type === 'header') {
  FieldGroup.push(headerTemplateCol0);
  }else{
  FieldGroup.push(controlCol0);
  }

  if (configurationModel.lines[lineIndex].columns[1].control.type === 'header') {
  FieldGroup.push(headerTemplateCol1);
  }else{
  FieldGroup.push(controlCol1);
  }

  formlyModel.push({
  className: 'row',
  fieldGroup: FieldGroup
  });
};




const addThreeColumnControl = (formlyModel, configurationModel,lineIndex) => {
  //text header is stored in "description" in templateOtion model
  const headerTemplateCol0 =  {
  className: 'col-xs-4',
  template : `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control)}<h2><hr/></div></div>`
  };

  const headerTemplateCol1 =  {
  className: 'col-xs-4',
  template:`<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control)}<h2><hr/></div></div>`
  };

  const headerTemplateCol2 =  {
  className: 'col-xs-4',
  template:`<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control)}<h2><hr/></div></div>`
  };

  const controlCol0 =  {
  className  : 'col-xs-4',
  type      : typeof configurationModel.lines[lineIndex].columns[0].control.type   !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
  key        : typeof configurationModel.lines[lineIndex].columns[0].control.key   !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
  templateOptions: {
  type        : extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
  label        : extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
  required     : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
  placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
  description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
  options     : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
  },
  expressionProperties   : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
  validators             : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
  validation             : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
  };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') {
  addDatepickerOptionsProperty(controlCol0, configurationModel,lineIndex);
  }

  const controlCol1 = {
  className  : 'col-xs-4',
  type      : typeof configurationModel.lines[lineIndex].columns[1].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[1].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[1].control.type) : 'blank',
  key        : typeof configurationModel.lines[lineIndex].columns[1].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[1].control.key : 'blank' + Date.now(),
  templateOptions: {
  type        : extractTemplateOptionType(configurationModel.lines[lineIndex].columns[1].control),
  label        : extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[1].control),
  required     : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[1].control),
  placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[1].control),
  description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control),
  options     : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[1].control)
  },
  expressionProperties   : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
  validators             : extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
  validation             : extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)
  };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') {
  addDatepickerOptionsProperty(controlCol1, configurationModel,lineIndex);
  }
  const controlCol2 = {
  className  : 'col-xs-4',
  type      : typeof configurationModel.lines[lineIndex].columns[2].control.type !== 'undefined' ?  (configurationModel.lines[lineIndex].columns[2].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[2].control.type) : 'blank',
  key        : typeof configurationModel.lines[lineIndex].columns[2].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[2].control.key : 'blank' + Date.now(),
  templateOptions: {
  type        : extractTemplateOptionType(configurationModel.lines[lineIndex].columns[2].control),
  label        : extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[2].control),
  required     : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[2].control),
  placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[2].control),
  description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control),
  options     : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[2].control)
  },
  expressionProperties   : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[2].control),
  validators             : extractFormlyValidators(configurationModel.lines[lineIndex].columns[2].control),
  validation             : extractFormlyValidation(configurationModel.lines[lineIndex].columns[2].control)
  };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (configurationModel.lines[lineIndex].columns[2].control.type === 'datepicker') {
  addDatepickerOptionsProperty(controlCol2, configurationModel,lineIndex);
  }

  const FieldGroup = [];

  if (configurationModel.lines[lineIndex].columns[0].control.type === 'header') {
  FieldGroup.push(headerTemplateCol0);
  }else{
  FieldGroup.push(controlCol0);
  }

  if (configurationModel.lines[lineIndex].columns[1].control.type === 'header') {
  FieldGroup.push(headerTemplateCol1);
  }else{
  FieldGroup.push(controlCol1);
  }

  if (configurationModel.lines[lineIndex].columns[2].control.type === 'header') {
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
  extractFormlyExpressionProperties,
  extractFormlyValidators,
  extractFormlyValidation,
  extractTemplateOptionRequired,
  extractTemplateOptionOptions,
  extractTemplateOptionType,
  extractTemplateOptionPlaceholder,
  extractTemplateOptionDescription,

  addDatepickerOptionsProperty,
  addOneColumnHeader,
  addOneColumnControl,
  addTwoColumnControl,
  addThreeColumnControl
};
