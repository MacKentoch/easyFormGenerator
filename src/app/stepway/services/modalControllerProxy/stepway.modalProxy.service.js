import {
  resetNyaSelect,
  returnControlFromAddCtrlModalModel,
  validKeyUniqueness,
  getResetConfig
}                                         from './stepway.modalProxy.service.helpers.js';

const CONTROLLER_MODAL_PROXY_SERVICE = '$modalProxy';

class $modalProxy {
  constructor(easyFormSteWayConfig) {
    this.easyFormSteWayConfig = easyFormSteWayConfig;
  }

  initNyaSelect(nyaSelectObj) {
    return resetNyaSelect(nyaSelectObj);
  }

  getControlsDefinition() {
    const controls = {};
    resetNyaSelect(controls);
    return controls;
  }

  getNyASelectFromSelectedLineColumn(nyaSelectObj, configurationObj, indexLine, numcolumn) {
    resetNyaSelect(nyaSelectObj);
    /**
      * data send to modal controller
      */
    const controlAtThisLineThisCol = configurationObj.lines[indexLine].columns[numcolumn].control;

    if (controlAtThisLineThisCol && controlAtThisLineThisCol.templateOptions) {
      nyaSelectObj.temporyConfig = {
        selectedControl: controlAtThisLineThisCol.selectedControl ? controlAtThisLineThisCol.selectedControl : 'none',
        formlyLabel: controlAtThisLineThisCol.templateOptions.label ? controlAtThisLineThisCol.templateOptions.label : '',
        formlyRequired: controlAtThisLineThisCol.templateOptions.required ? controlAtThisLineThisCol.templateOptions.required : '',
        formlyDesciption: controlAtThisLineThisCol.templateOptions.description ? controlAtThisLineThisCol.templateOptions.description : '',
        formlyDefaultValue: controlAtThisLineThisCol.defaultValue ? controlAtThisLineThisCol.defaultValue : '',
        formlyPlaceholder: controlAtThisLineThisCol.templateOptions.placeholder ? controlAtThisLineThisCol.templateOptions.placeholder : '',
        formlyOptions: controlAtThisLineThisCol.templateOptions.options ? controlAtThisLineThisCol.templateOptions.options : '',
        formlyExpressionProperties: controlAtThisLineThisCol.formlyExpressionProperties ? angular.copy(controlAtThisLineThisCol.formlyExpressionProperties) : {},
        formlyValidators: controlAtThisLineThisCol.formlyValidators ? angular.copy(controlAtThisLineThisCol.formlyValidators) : {},
        formlyValidation: controlAtThisLineThisCol.formlyValidation ? angular.copy(controlAtThisLineThisCol.formlyValidation) : {}
      };
      // particular case : datepicker needs an additionnal property:
      if (nyaSelectObj.temporyConfig.selectedControl === 'Date') {
        nyaSelectObj.temporyConfig.datepickerOptions   = controlAtThisLineThisCol.templateOptions.datepickerOptions ? angular.copy(controlAtThisLineThisCol.templateOptions.datepickerOptions) : '';
      }
    }
    return nyaSelectObj;
  }


  bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, configurationObj){

    let extractedProps = returnControlFromAddCtrlModalModel(modalAddCtrlModel);
    configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl     = extractedProps.selectedControl;
    configurationObj.lines[indexLine].columns[numcolumn].control.type               = extractedProps.formlyType;
    configurationObj.lines[indexLine].columns[numcolumn].control.subtype             = extractedProps.formlySubtype;
    //reset templateOptions
    configurationObj
      .lines[indexLine]
      .columns[numcolumn]
      .control.templateOptions   = {
        label: '',
        required: false,
        description: '',
        placeholder: '',
        options: []
      };
      //then bind templateOptions
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label        = extractedProps.formlyLabel;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required     = extractedProps.formlyRequired;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description  = extractedProps.formlyDesciption;
    configurationObj.lines[indexLine].columns[numcolumn].control.defaultValue                 = extractedProps.formlyDefaultValue;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder  = extractedProps.formlyPlaceholder;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options      = extractedProps.formlyOptions;
    configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties   = angular.copy(extractedProps.formlyExpressionProperties);
    configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators             = angular.copy(extractedProps.formlyValidators);
    configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation             = angular.copy(extractedProps.formlyValidation);

    //////////////////////////////////////////
    // add additionnal particular properties
    //////////////////////////////////////////
    //-> datepicker : datepickerOptions
    if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerOptions = angular.copy(extractedProps.datepickerOptions);
    }
    /**
      * unique key (set only first time) in this model is formly control type + Date.now();
      */
    let newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

    if (validKeyUniqueness(newKey, configurationObj) === true){
      configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
    }else{
      /**
        * 2nd attempt
        */
      newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

      if (validKeyUniqueness(newKey, configurationObj) === true){
        configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
      }else{
        /**
          * 3rd attempt
          */
        newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
      }
    }
    configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;
  }


  applyConfigToSelectedControl(nyaSelectObj){
    /**
      * used in modal (edit control)
      */
    for (let i = nyaSelectObj.controls.length - 1; i >= 0; i--) {
      if (nyaSelectObj.controls[i].id === nyaSelectObj.selectedControl) {

          nyaSelectObj.controls[i].formlyLabel                 = nyaSelectObj.temporyConfig.formlyLabel;
          nyaSelectObj.controls[i].formlyRequired             = nyaSelectObj.temporyConfig.formlyRequired;
          nyaSelectObj.controls[i].formlyDesciption           = nyaSelectObj.temporyConfig.formlyDesciption;
          nyaSelectObj.controls[i].formlyDefaultValue          = nyaSelectObj.temporyConfig.formlyDefaultValue;
          nyaSelectObj.controls[i].formlyPlaceholder           = nyaSelectObj.temporyConfig.formlyPlaceholder;
          nyaSelectObj.controls[i].formlyOptions               = nyaSelectObj.temporyConfig.formlyOptions;

          if (nyaSelectObj.controls[i].id ==='Date' ) {
            nyaSelectObj.controls[i].datepickerOptions         = angular.copy(nyaSelectObj.temporyConfig.datepickerOptions);
          }

        }
    }
  }

  resetTemporyConfig(){
    return getResetConfig();
  }

  /**
    * loading forms will not be able to retrieve formlyExpressionProperties
    * -> here does the job
    */
  refreshControlFormlyExpressionProperties(configurationModel){
    if (angular.isObject(configurationModel)) {
      //iterates lines
      angular.forEach(configurationModel.lines, (line, indexLine) => {
        angular.forEach(line.columns, (column, controlIndex) => {
          let _controlsDefinition = this.getControlsDefinition();
          angular.forEach(_controlsDefinition.controls, (aControl, aControlIndex) => {
            if (column.control.type === aControl.formlyType &&
                column.control.subtype === aControl.formlySubtype) {
                //----> update control formlyExpressionProperties property
                column.control.formlyExpressionProperties = aControl.formlyExpressionProperties;
            }
          });
        });
      });
    }
  }


  /**
    * loading forms will not be able to retrieve formlyValidators
    * -> here does the job
    */
  refreshControlFormlyValidators(configurationModel){
    if (angular.isObject(configurationModel)) {
      //iterates lines
      angular.forEach(configurationModel.lines, (line, indexLine) => {
        angular.forEach(line.columns, (column, controlIndex) => {
          let _controlsDefinition = this.getControlsDefinition();
          angular.forEach(_controlsDefinition.controls, (aControl, aControlIndex) => {
            if (column.control.type === aControl.formlyType &&
                column.control.subtype === aControl.formlySubtype) {
                //----> update control formlyValidators property
                column.control.formlyValidators = aControl.formlyValidators;
            }
          });
        });
      });
    }
  }


  /**
    * loading forms will not be able to retrieve formlyValidation
    * -> here does the job
    */
  refreshControlFormlyValidation(configurationModel){
    if (angular.isObject(configurationModel)) {
      //iterates lines
      angular.forEach(configurationModel.lines, (line, indexLine) => {
        angular.forEach(line.columns, (column, controlIndex) => {
          let _controlsDefinition = this.getControlsDefinition();
          angular.forEach(_controlsDefinition.controls, (aControl, aControlIndex) => {
            if (column.control.type === aControl.formlyType &&
                column.control.subtype === aControl.formlySubtype) {
                //----> update control formlyValidation property
                column.control.formlyValidation = aControl.formlyValidation;
            }
          });
        });
      });
    }
  }


  filterDisabledControl(nyaSelectObj){
    let listAllEnabledControl = this.easyFormSteWayConfig.getListEnabledControl();
    let filteredNyaList = [];
    angular.forEach(listAllEnabledControl, (enabledControl) => {
      angular.forEach(nyaSelectObj.controls, (nyaControl) => {
        if ((nyaControl.id === enabledControl.name) &&
            (enabledControl.enabled === true)) {
          filteredNyaList = filteredNyaList.concat(nyaControl);
        }
      });
    });
    return filteredNyaList;
  }

  getFilteredNyaSelectObject(){
    let newNyaSelectObj = {};
    resetNyaSelect(newNyaSelectObj);
    return angular.copy(this.filterDisabledControl(angular.copy(newNyaSelectObj)));
    //return angular.copy(angular.copy(newNyaSelectObj));
  }

}

$modalProxy.$inject= ['easyFormSteWayConfig'];
export default $modalProxy;
export {CONTROLLER_MODAL_PROXY_SERVICE};
