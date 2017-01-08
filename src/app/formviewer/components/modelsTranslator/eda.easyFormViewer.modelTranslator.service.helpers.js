import { configs as stepwayControls } from '../../../stepway/components/controls';
import {
  configurationModelInit,
  configurationModelResult
}                                     from '../../../stepway/services/formlyProxy/formlyProxy.service.helpers';

const resetNyaSelect = (nyaSelectObj) => {
  //reset
  angular.copy({controls: [...stepwayControls]}, nyaSelectObj);
  return true;
};

const getConfigurationModelInit = () => ({ ...configurationModelInit });

const getEmptyConfigModelResult = () => ({ ...configurationModelResult });

const resetDataModel = (obj) => {
  const emptyDataModel = {};
  angular.copy(emptyDataModel, obj);
  return true;
};

const getErrorObject = (errorTitle, errorMessage) => {
  const messageObj = {
    noError : false,
    title    : '',
    Message  : ''
  };
  messageObj.noError  = false;
  messageObj.title     = errorTitle;
  messageObj.Message   = errorMessage;
  return messageObj;
};

const getMessageObject = (messageTitle, messageBody) => {
  const messageObj = {
    noError   : false,
    title      : '',
    Message    : ''
  };
  messageObj.noError  = true;
  messageObj.title     = messageTitle;
  messageObj.Message   = messageBody;
  return messageObj;
};

const resetFormlyModel = (formlyModel) => {
  var resetformly = [];
  angular.copy(resetformly, formlyModel);
};

//
const extractTemplateOptionDescription = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.description !== 'undefined'? obj.templateOptions.description: '') : '';

const extractTemplateOptionPlaceholder = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.placeholder !== 'undefined'? obj.templateOptions.placeholder: '') : '';

const extractTemplateOptionType = (obj) => typeof obj.subtype !== 'undefined'? obj.subtype: '';

// const isTemplateOptionDefined = (obj) => typeof obj.templateOptions !== 'undefined' ? true : false;

const extractTemplateOptionLabel = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.label !== 'undefined'? obj.templateOptions.label: '') : '';

const extractTemplateOptionDatepickerOptions = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.datepickerOptions !== 'undefined'? angular.copy(obj.templateOptions.datepickerOptions) : '') : '';

const extractFormlyExpressionProperties = (obj) => typeof obj.formlyExpressionProperties !== 'undefined' ? angular.copy(obj.formlyExpressionProperties) : {};

const extractFormlyValidators = (obj) => typeof obj.formlyValidators !== 'undefined' ? angular.copy(obj.formlyValidators): {};

const extractFormlyValidation = (obj) => typeof obj.formlyValidation !== 'undefined' ?  angular.copy(obj.formlyValidation) : {};

const extractTemplateOptionRequired = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.required !== 'undefined'? obj.templateOptions.required: '') : '';

const extractTemplateOptionOptions = (obj) => typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.options !== 'undefined'? obj.templateOptions.options: '') : '';

const addDatepickerOptionsProperty = (fieldToPush, configurationModel,lineIndex) => fieldToPush.templateOptions.datepickerOptions = extractTemplateOptionDatepickerOptions(configurationModel.lines[lineIndex].columns[0].control);


const addOneColumnHeader = (formlyModel, configurationModel,lineIndex) => {
  /**
    * text header is stored in "description" in templateOtion model
    */
  let headerTemplateCol0 = `<div class="row"><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control)}<h2></div></div><hr/>`;
  formlyModel.push(
    {
      template: typeof configurationModel
                          .lines[lineIndex]
                          .columns[0]
                          .control
                          .type !== 'undefined' ?
                            (configurationModel.lines[lineIndex].columns[0].control.type === 'header' ?
                              headerTemplateCol0
                              : '<div></div>')
                            : '<div></div>'
    }
  );
};


const addOneColumnControl = (formlyModel, configurationModel,lineIndex) => {
  let fieldToPush = {
    className  : 'col-xs-12',
    type  : typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
    key    : typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
    templateOptions: {
      type                  : extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
      label                 : extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
      required              : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
      placeholder           : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
      description           : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
      options               : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
    },
    expressionProperties  : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
    validators            : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
    validation            : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
  };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') addDatepickerOptionsProperty(fieldToPush, configurationModel,lineIndex);

  formlyModel.push(fieldToPush);
};



const addTwoColumnControl = (formlyModel, configurationModel,lineIndex) => {

  //text header is stored in "description" in templateOtion model
  let headerTemplateCol0 = {
    className: 'col-xs-6',
    template : `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control)}<h2><hr/></div></div>`
  };

  let headerTemplateCol1 = {
    className: 'col-xs-6',
    template : `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control)}<h2><hr/></div></div>`
  };

  let controlCol0 = {
    className  : 'col-xs-6',
    type      : typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
    key        : typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
    templateOptions: {
        type        : extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
        label        : extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
        required     : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
        placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
        description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
        options     : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
    },
        expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
        validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
        validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
    };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') addDatepickerOptionsProperty(controlCol0, configurationModel,lineIndex);

  let controlCol1 =  {
    className  : 'col-xs-6',
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
        expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
        validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
        validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)
    };

  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') addDatepickerOptionsProperty(controlCol1, configurationModel,lineIndex);

  let FieldGroup = [];

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
    className  : 'row',
    fieldGroup: FieldGroup
  });

};


const addThreeColumnControl = (formlyModel, configurationModel,lineIndex) => {
  //text header is stored in "description" in templateOtion model
  let headerTemplateCol0 =  {
    className  : 'col-xs-4',
    template   : `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control)}<h2><hr/></div></div>`
  };

  let headerTemplateCol1 =  {
    className  : 'col-xs-4',
    template  : `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[1].control)}<h2><hr/></div></div>`
  };

  let headerTemplateCol2 =  {
    className  : 'col-xs-4',
    template  : `<div class="row"><div class=""><h2 class="text-center">${extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[2].control)}<h2><hr/></div></div>`
  };

  var controlCol0 =     {
      className  : 'col-xs-4',
      type      : typeof configurationModel.lines[lineIndex].columns[0].control.type !== 'undefined' ? (configurationModel.lines[lineIndex].columns[0].control.type === 'none' ? 'blank': configurationModel.lines[lineIndex].columns[0].control.type): 'blank',
      key        : typeof configurationModel.lines[lineIndex].columns[0].control.key !== 'undefined' ?  configurationModel.lines[lineIndex].columns[0].control.key : 'blank' + Date.now(),
      templateOptions: {
          type        : extractTemplateOptionType(configurationModel.lines[lineIndex].columns[0].control),
          label        : extractTemplateOptionLabel(configurationModel.lines[lineIndex].columns[0].control),
          required     : extractTemplateOptionRequired(configurationModel.lines[lineIndex].columns[0].control),
          placeholder : extractTemplateOptionPlaceholder(configurationModel.lines[lineIndex].columns[0].control),
          description : extractTemplateOptionDescription(configurationModel.lines[lineIndex].columns[0].control),
          options     : extractTemplateOptionOptions(configurationModel.lines[lineIndex].columns[0].control)
      },
          expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[0].control),
          validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[0].control),
          validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[0].control)
    };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (configurationModel.lines[lineIndex].columns[0].control.type === 'datepicker') addDatepickerOptionsProperty(controlCol0, configurationModel,lineIndex);

  let controlCol1 =  {
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
          expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[1].control),
          validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[1].control),
          validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[1].control)
    };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (configurationModel.lines[lineIndex].columns[1].control.type === 'datepicker') addDatepickerOptionsProperty(controlCol1, configurationModel,lineIndex);

  let controlCol2 =  {
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
          expressionProperties : extractFormlyExpressionProperties(configurationModel.lines[lineIndex].columns[2].control),
          validators : extractFormlyValidators(configurationModel.lines[lineIndex].columns[2].control),
          validation : extractFormlyValidation(configurationModel.lines[lineIndex].columns[2].control)
    };
  //////////////////////////////////////////////
  //datepicker additionnal particular property
  //////////////////////////////////////////////
  if (configurationModel.lines[lineIndex].columns[2].control.type === 'datepicker') addDatepickerOptionsProperty(controlCol2, configurationModel,lineIndex);

  let FieldGroup = [];

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





export {
  resetNyaSelect,
  getConfigurationModelInit,
  getEmptyConfigModelResult,
  resetDataModel,
  getErrorObject,
  getMessageObject,
  resetFormlyModel,
  addOneColumnHeader,
  addOneColumnControl,
  addTwoColumnControl,
  addThreeColumnControl
};
