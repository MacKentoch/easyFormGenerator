import {
  resetNyaSelect,
  getEmptyConfigModelResult,
  resetDataModel,
  getErrorObject,
  getMessageObject,
  resetFormlyModel,
  addOneColumnControl,
  addTwoColumnControl,
  addThreeColumnControl
}    from './eda.easyFormViewer.modelTranslator.service.helpers';

const MODEL_TRANSLATOR_SERVICE = '$modelsTranslator';

class $modelsTranslator {
  static $inject = [];

  constructor() {

  }

  initNyaSelect(nyaSelectObj){
    return resetNyaSelect(nyaSelectObj);
  }

  /**
    * get all controls definition (nyaSelectObj)
    *
    * needed to bind these properties :
    *
    * formlyExpressionProperties: {},
    * formlyValidators: {},
    * formlyValidation
    */
  getControlsDefinition(){
    const controls = {};
    resetNyaSelect(controls);
    return controls;
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

  bindConfigurationLines(configurationModel, lines){
    if(angular.isArray(lines)){
      const configurationModelResult  = getEmptyConfigModelResult();
      configurationModelResult.lines  = [].concat(lines);
      angular.copy(configurationModelResult, configurationModel);
      return getMessageObject('configuration model is bound','lines are bound to configuration model.');
    } else {
      return getErrorObject('lines is not an array', 'Checks lines type, it is not an array.');
    }
  }

  applyConfigurationToformlyModel(configurationModel, formlyModel, formlyDataModel) {
    resetFormlyModel(formlyModel);
    resetDataModel(formlyDataModel);

    configurationModel.lines.forEach(
      (line, lineIndex) => {
        if (line.columns.length === 1) {
          addOneColumnControl(formlyModel, configurationModel, lineIndex);
        }
        if (line.columns.length === 2) {
          addTwoColumnControl(formlyModel, configurationModel, lineIndex);
        }
        if (line.columns.length === 3) {
          addThreeColumnControl(formlyModel, configurationModel, lineIndex);
        }
      }
    );
  }
}

export default $modelsTranslator;

export {MODEL_TRANSLATOR_SERVICE};
