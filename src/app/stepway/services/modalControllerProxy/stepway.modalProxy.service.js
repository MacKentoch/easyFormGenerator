import {
  resetNyaSelect,
  returnControlFromAddCtrlModalModel,
  validKeyUniqueness,
  getResetConfig
}                                         from './stepway.modalProxy.service.helpers.js';

const CONTROLLER_MODAL_PROXY_SERVICE = '$modalProxy';

class $modalProxy {
  constructor(easyFormSteWayConfig) {
    this.easyFormSteWayConfig  =  easyFormSteWayConfig;
  }

  initNyaSelect(nyaSelectObj) {
    return resetNyaSelect(nyaSelectObj);
  }

  getControlsDefinition() {
    let controls = {};
    resetNyaSelect(controls);
    return controls;
  }

  getNyASelectFromSelectedLineColumn(nyaSelectObj, configurationObj, indexLine, numcolumn) {
    resetNyaSelect(nyaSelectObj);
    /**
      * data send to modal controller
      */
    if (typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions != 'undefined') {

      nyaSelectObj.temporyConfig.selectedControl     = typeof configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl             != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl : 'none';
      nyaSelectObj.temporyConfig.formlyLabel         = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label       != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
      nyaSelectObj.temporyConfig.formlyRequired     = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required     != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
      nyaSelectObj.temporyConfig.formlyDesciption   = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
      nyaSelectObj.temporyConfig.formlyPlaceholder   = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
      nyaSelectObj.temporyConfig.formlyOptions       = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options     != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';

      nyaSelectObj.temporyConfig.formlyExpressionProperties = typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties   != 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties) : {};
      nyaSelectObj.temporyConfig.formlyValidators   = typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators                     != 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators) : {};
      nyaSelectObj.temporyConfig.formlyValidation   = typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation                     != 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation) : {};

      // particular case : datepicker
      if (nyaSelectObj.temporyConfig.selectedControl === 'Date') {
        nyaSelectObj.temporyConfig.datepickerOptions   = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerOptions != 'undefined' ? angular.copy(configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerOptions) : '';
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
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label          = extractedProps.formlyLabel;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required      = extractedProps.formlyRequired;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description   = extractedProps.formlyDesciption;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder   = extractedProps.formlyPlaceholder;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options        = extractedProps.formlyOptions;
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
