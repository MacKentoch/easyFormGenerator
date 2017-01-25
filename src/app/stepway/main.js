import easyFormStepWayConfig, {
    EASY_FORM_VERSION_NAME,
    EASY_FORM_VERSION_VALUE }                   from './config/easyFormGenerator/easyFormGenerator.config';
import formlyConfig                             from './config/formly/formly.config';
import translateConfig                          from './config/translate/translate.config';

import easyFormStepWayCoreModule                from './core/core.module';

import easyFormStepwayMainModule                from './components/main/main.module';
import easyFormStepwayWizardModule              from './components/wizard/stepway.wizard.module';
import easyFormStepwayModalModule               from './components/modal/editControlModal.module';
import easyFormStepwayModalProxyModule          from './services/modalProxy/modalProxy.service';
import easyFormStepwayFormlyProxyModule         from './services/formlyProxy/formlyProxy.service';
import easyFormStepwaySelectOptionManageModules from './services/selectOptionManage/selectOptionManage.service';

const STEP_WAY_MODULE_NAME = 'eda.easyformGen.stepway';
const STEP_WAY_MODULES_INJECT = [
  easyFormStepWayCoreModule.name,
  translateConfig.name,
  easyFormStepwayMainModule.name,
  easyFormStepwayWizardModule.name,
  easyFormStepwayModalModule.name,
  easyFormStepwayModalProxyModule.name,
  easyFormStepwayFormlyProxyModule.name,
  easyFormStepwaySelectOptionManageModules.name
];

const mainModule = angular
                  .module(STEP_WAY_MODULE_NAME, STEP_WAY_MODULES_INJECT)
                  .value(EASY_FORM_VERSION_NAME, EASY_FORM_VERSION_VALUE)
                  .config(formlyConfig)
                  .config(easyFormStepWayConfig);

export default mainModule;
