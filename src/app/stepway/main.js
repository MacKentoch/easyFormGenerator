import easyFormStepWayConfig, {
    EASY_FORM_VERSION_NAME,
    EASY_FORM_VERSION_VALUE }                   from './config/easyFormGenerator/stepway.conf.easyFormConf';
import formlyConfig                             from './config/formly/stepway.conf.formly';
import translateConfig                          from './config/translate/translate.config';

import easyFormStepWayCoreModule                from './core/core.module';

import easyFormStepwayMainModule                from './components/main/stepway.main.module';
import easyFormStepwayWizardModule              from './components/wizard/stepway.wizard.module';
import easyFormStepwayModalModule               from './components/modal/stepway.editControlModal.module';
import easyFormStepwayModalProxyModule          from './services/modalControllerProxy/modalProxy.service';
import easyFormStepwayFormlyProxyModule         from './services/formlyProxy/formlyProxy.service';
import easyFormStepwaySelectOptionManageModules from './services/selectOptionManage/stepway.selectOptionManage.module';

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
