import { configs as stepwayControls } from '../../../stepway/components/controls';
import {
  configurationModelInit,
  configurationModelResult,
  addOneColumnControl,
  addTwoColumnControl,
  addThreeColumnControl
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

export {
  resetNyaSelect,
  getConfigurationModelInit,
  getEmptyConfigModelResult,
  resetDataModel,
  getErrorObject,
  getMessageObject,
  resetFormlyModel,
  addOneColumnControl,
  addTwoColumnControl,
  addThreeColumnControl
};
