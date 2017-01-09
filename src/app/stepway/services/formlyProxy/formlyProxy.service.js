import {
  configurationModelInit,
  configurationModelResult,
  resetDataModel,
  resetFormlyModel,
  addOneColumnControl,
  addTwoColumnControl,
  addThreeColumnControl
}                             from './formlyProxy.service.helpers';

export const FORMLY_PROXY_SERVICE = '$formlyProxy';

class $formlyProxy {
  static $inject = [];

  constructor() {

  }

  initConfigurationEditFromScratch(configurationModel) {
    angular.copy(configurationModelInit, configurationModel);
  }

  bindConfigurationLines(configurationModel, lines) {
    if (angular.isArray(lines)) {
      const configModelResult = configurationModelResult;
      configModelResult.lines = [...lines];
      angular.copy(configModelResult, configurationModel);
      return this.getMessageObject('configuration model is bound','lines are bound to configuration model.');
    } else {
      return this.getErrorObject('lines is not an array', 'Checks lines type, it is not an array.');
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

  getMessageObject(messageTitle, messageBody) {
    const messageObj = {
      noError: true,
      title: messageTitle,
      Message: messageBody
    };
    return messageObj;
  }
}

export const FORMLY_PROXY_MODULE_NAME = 'formlyProxyModule';
export default angular
                  .module(FORMLY_PROXY_MODULE_NAME, [])
                  .service(FORMLY_PROXY_SERVICE, $formlyProxy);
