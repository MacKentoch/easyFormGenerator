const FORM_FIELD_MANAGE_SERVICE = 'formFieldManage';

class formFieldManage{

  constructor(EasyFormGenFormlyBindingModels) {
    this.EasyFormGenFormlyBindingModels = EasyFormGenFormlyBindingModels;
    this.init();
  }

  init() {

  }

  /**
   * At initial state : configuration model will contain 1 line, since :
   *    -> it is non sense to create a form without a single line (no line = no form at all)
   *    -> so it is non sense to force user to add a first line
   *
   *  PLEASE NOTE columns array contains objects that look like formly fields one
   */
  initConfigurationEditFromScratch(configurationModel, addStepWayProperties) {
    let configurationModelInit = this.EasyFormGenFormlyBindingModels.getEasyFormInitialStateConfigurationModel(addStepWayProperties);
    angular.copy(configurationModelInit, configurationModel);
  }

  /**
   * Get an configuration empty (no init line) then empty it with lines array provided in param
   * @param   object - configurationModel   [configuration model]
   * @param   array -  lines                [an array : lines to apply to an empty configuration model]
   * @param   bool -   addStepWayProperties [description]
   * @return {object message}               [give details on how it happened to caller]
   */
  bindConfigurationLines(configurationModel, lines, addStepWayProperties){
    if( Object.prototype.toString.call(lines) === '[object Array]' ) {
      let configurationModelResult = this.EasyFormGenFormlyBindingModels.getEasyFormReloadConfigurationModel(addStepWayProperties);
      configurationModelResult.lines = [].concat(lines);
      angular.copy(configurationModelResult, configurationModel);
      return this.getMessageObject('configuration model is bound','lines are bound to configuration model.');
    }else{
      return this.getErrorObject('lines is not an array', 'Checks lines type, it is not an array.');
    }
  }


  /**
   * applyConfigurationToformlyModel :
   *  - bind configuration model into formly field model
   *  - reset dataModel (formlyfield may have changed so previous dataModel would be false)
   * @param  configurationModel
   * @param  formlyModel
   * @param  formlyDataModel
   */
  applyConfigurationToformlyModel(configurationModel, formlyModel, formlyDataModel){
    this.resetFormlyModel(formlyModel);
    this.resetDataModel(formlyDataModel);
    let lineNumber = configurationModel.lines.length;
    for (let i = 0; i < lineNumber; i++) {
      this.AddNColumnControl(formlyModel, configurationModel, i);
    }
  }


  resetFormlyModel(formlyModel){
    let resetformly = [];
    angular.copy(resetformly, formlyModel);
  }


  AddNColumnControl(formlyModel, configurationModel, lineIndex){

    let numberOfColumns = configurationModel.lines[lineIndex].columns.length;
    /**
     * push formly model
     * here : only className and empty fieldGroup (controls != header)
     * if header will be reset to set a template (at least we have now indexFormlyModel)
     */
    let rawFormlyModel = {
      className   : 'row',
      fieldGroup  : []
    };
    //get index formlyModel for this line :
    let indexFormlyModel =  formlyModel.push(rawFormlyModel) - 1 ;

    // iterates through controls in the line
    configurationModel.lines[lineIndex].columns.forEach( (column) => {
      let controlTemplate = {};
      if (typeof controlTemplate  !== 'undefined' &&
          // column.control.type     !== 'header'    &&
          // column.control.type     !== 'subTitle'  &&
          column.control.type     !== 'none') {
        /**
         * controls : getFormlyControlTemplateForNcolumnLine()
         *
          * @PARAM numberOfColumns       : integer to deduce cssClss to apply
          * @PARAM column.control.type   : to add if needed specific properties (example : datepicker)
          */
        if(column.control.type  === 'header' ||
            column.control.type  === 'subTitle'){
          let headerTextContent     = column.control.templateOptions.description;
          controlTemplate.template  = this.EasyFormGenFormlyBindingModels.getHeaderTemplateForNcolumnLine(numberOfColumns, headerTextContent).template;
          controlTemplate.className = this.EasyFormGenFormlyBindingModels.getRawHeaderTemplates().selectedClass;
        } else {
          controlTemplate = this.EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(numberOfColumns, column.control.type);
          /**
          * NEED REFACTOR HERE
          * should bind properties dynamically
          *
          * TODO need to validate all controls (datepicker may not work)
          * need to refactor
          */
          controlTemplate.className                   = column.control.className;
          controlTemplate.type                        = column.control.type;
          controlTemplate.key                         = column.control.key;
          controlTemplate.templateOptions.type        = column.control.templateOptions.type;
          controlTemplate.templateOptions.label       = column.control.templateOptions.label;
          controlTemplate.templateOptions.required    = column.control.templateOptions.required;
          controlTemplate.templateOptions.placeholder = column.control.templateOptions.placeholder;
          controlTemplate.templateOptions.description = column.control.templateOptions.description;
          controlTemplate.templateOptions.options     = [].concat(column.control.templateOptions.options);

          if (typeof controlTemplate.templateOptions.datepickerPopup !== 'undefined')  column.control.templateOptions.datepickerPopup = controlTemplate.templateOptions.datepickerPopup  ;
        }
        /**
         * popuplate properties
         */

        /**
         * push control into formly model in its group
         */

          /**
          * need to catch this random error
          */
          formlyModel[indexFormlyModel].fieldGroup.push(controlTemplate);
        }
      }
    );
  }

  isTemplateOptionDefined(obj){
    return typeof obj.templateOptions !== 'undefined' ? true : false;
  }

  extractTemplateOptionLabel(obj){
    return typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.label !== 'undefined'? obj.templateOptions.label: '') : '';
  }

  extractTemplateOptionDatepickerPopup(obj){
    return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.datepickerPopup !== 'undefined'? obj.templateOptions.datepickerPopup: '') : '';
  }

  extractTemplateOptionRequired(obj){
    return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.required !== 'undefined'? obj.templateOptions.required: '') : '';
  }
  //radio and select
  extractTemplateOptionOptions(obj){
    return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.options !== 'undefined'? obj.templateOptions.options: '') : '';
  }

  extractTemplateOptionType(obj){
    return  typeof obj.subtype !== 'undefined'? obj.subtype: '';
  }

  extractTemplateOptionPlaceholder(obj){
    return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.placeholder !== 'undefined'? obj.templateOptions.placeholder: '') : '';
  }

  extractTemplateOptionDescription(obj){
    return  typeof obj.templateOptions !== 'undefined' ? (typeof obj.templateOptions.description !== 'undefined'? obj.templateOptions.description: '') : '';
  }

  // formly model functions
  resetDataModel(obj){
    let emptyDataModel = {};
    angular.copy(emptyDataModel, obj);
    return true;
  }

  // custom errors
  getErrorObject(errorTitle, errorMessage){
    let messageObj =  {
      noError   : false,
      title     : '',
      Message   : ''
    };
    messageObj.noError  = false;
    messageObj.title    = errorTitle;
    messageObj.Message  = errorMessage;
    return messageObj;
  }

  getMessageObject(messageTitle, messageBody){
    let messageObj =  {
      noError   : false,
      title     : '',
      Message   : ''
    };
    messageObj.noError    = true;
    messageObj.title      = messageTitle;
    messageObj.Message    = messageBody;
    return messageObj;
  }

}

formFieldManage.$inject = [
  'EasyFormGenFormlyBindingModels'
];

export default formFieldManage;

export {
  FORM_FIELD_MANAGE_SERVICE
};
