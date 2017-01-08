import {
  resetNyaSelect,
  returnControlFromAddCtrlModalModel,
  validKeyUniqueness,
  getResetConfig
}                                         from './modalProxy.service.helpers.js';

export const CONTROLLER_MODAL_PROXY_SERVICE = '$modalProxy';

class $modalProxy {
  static $inject= ['easyFormSteWayConfig'];

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
        formlyDescription: controlAtThisLineThisCol.templateOptions.description ? controlAtThisLineThisCol.templateOptions.description : '',
        formlyDefaultValue: controlAtThisLineThisCol.defaultValue ? controlAtThisLineThisCol.defaultValue : '',
        formlyPlaceholder: controlAtThisLineThisCol.templateOptions.placeholder ? controlAtThisLineThisCol.templateOptions.placeholder : '',
        formlyOptions: controlAtThisLineThisCol.templateOptions.options ? controlAtThisLineThisCol.templateOptions.options : '',
        formlyExpressionProperties: controlAtThisLineThisCol.formlyExpressionProperties ? angular.copy(controlAtThisLineThisCol.formlyExpressionProperties) : {},
        formlyValidators: controlAtThisLineThisCol.formlyValidators ? angular.copy(controlAtThisLineThisCol.formlyValidators) : {},
        formlyValidation: controlAtThisLineThisCol.formlyValidation ? angular.copy(controlAtThisLineThisCol.formlyValidation) : {}
      };
      // particular case : datepicker needs an additionnal property:
      if (nyaSelectObj.temporyConfig.selectedControl === 'Date') {
        nyaSelectObj.temporyConfig.datepickerOptions = controlAtThisLineThisCol.templateOptions.datepickerOptions
        ? angular.copy(controlAtThisLineThisCol.templateOptions.datepickerOptions)
        : { format: '' };
      }
    }
    return nyaSelectObj;
  }


  bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, configurationObj) {
    const extractedProps = returnControlFromAddCtrlModalModel(modalAddCtrlModel);

    const updatedControl = {
      selectedControl: extractedProps.selectedControl,
      type: extractedProps.formlyType,
      subtype: extractedProps.formlySubtype,
      defaultValue: extractedProps.defaultValue,
      templateOptions: {
        label: extractedProps.formlyLabel,
        required: extractedProps.formlyRequired,
        description: extractedProps.formlyDescription,
        placeholder: extractedProps.formlyPlaceholder,
        options: [...extractedProps.formlyOptions]
      },
      formlyExpressionProperties: angular.copy(extractedProps.formlyExpressionProperties),
      formlyValidators: angular.copy(extractedProps.formlyValidators),
      formlyValidation: angular.copy(extractedProps.formlyValidation)
    };
    // particular case: datepicker : additionnal prop datepickerOptions
    if (updatedControl.type === 'datepicker') {
      updatedControl.templateOptions.datepickerOptions = angular.copy(extractedProps.datepickerOptions);
    }
    /**
      * unique key (set only first time) in this model is formly control type + Date.now();
      */
    // 1st attempt
    let newKey = updatedControl.type + '-' + Date.now();
    if (validKeyUniqueness(newKey, configurationObj) === true){
      updatedControl.key = newKey;
    } else {
      // 2nd attempt
      newKey = updatedControl.type + '-' + Date.now();
      if (validKeyUniqueness(newKey, configurationObj) === true) {
        updatedControl.key = newKey;
      } else {
        // 3rd attempt
        updatedControl.type + '-' + Date.now();
      }
    }
    updatedControl.edited = true;
    // ///////////////////////
    // finally bind it:
    // ///////////////////////
    configurationObj.lines[indexLine].columns[numcolumn].control = angular.copy(updatedControl);
  }


  applyConfigToSelectedControl(nyaSelectObj){
    /**
      * used in modal (edit control)
      */
    const selectedControl = nyaSelectObj.selectedControl;

    nyaSelectObj.controls.forEach(
      control => {
        if (control.id === selectedControl) {
          control.formlyLabel = nyaSelectObj.temporyConfig.formlyLabel,
          control.formlyRequired = nyaSelectObj.temporyConfig.formlyRequired;
          control.formlyDescription = nyaSelectObj.temporyConfig.formlyDescription;
          control.formlyDefaultValue = nyaSelectObj.temporyConfig.formlyDefaultValue;
          control.formlyPlaceholder = nyaSelectObj.temporyConfig.formlyPlaceholder;
          control.formlyOptions = nyaSelectObj.temporyConfig.formlyOptions;
        }

        if (control.id ==='Date' ) {
          control.datepickerOptions = angular.copy(nyaSelectObj.temporyConfig.datepickerOptions);
        }
      }
    );
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
      angular.forEach(configurationModel.lines, (line) => {
        angular.forEach(line.columns, (column) => {
          const _controlsDefinition = this.getControlsDefinition();
          angular.forEach(_controlsDefinition.controls, (aControl) => {
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
      angular.forEach(configurationModel.lines, (line) => {
        angular.forEach(line.columns, (column) => {
          const _controlsDefinition = this.getControlsDefinition();
          angular.forEach(_controlsDefinition.controls, (aControl) => {
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
      angular.forEach(configurationModel.lines, (line) => {
        angular.forEach(line.columns, (column) => {
          const _controlsDefinition = this.getControlsDefinition();
          angular.forEach(_controlsDefinition.controls, (aControl) => {
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
    const listAllEnabledControl = this.easyFormSteWayConfig.getListEnabledControl();
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
    const newNyaSelectObj = {};
    resetNyaSelect(newNyaSelectObj);
    return angular.copy(this.filterDisabledControl(angular.copy(newNyaSelectObj)));
    //return angular.copy(angular.copy(newNyaSelectObj));
  }

}

export const MODAL_PROXY_MODULE_NAME = 'modalProxyModule';
export default angular
                  .module(MODAL_PROXY_MODULE_NAME, [])
                  .service(CONTROLLER_MODAL_PROXY_SERVICE,  $modalProxy);
