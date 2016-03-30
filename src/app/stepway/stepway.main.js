import './stepway.vendor.adapter';
import easyFormStepWayConfig, {
		EASY_FORM_VERSION_NAME,
		EASY_FORM_VERSION_VALUE } 					from './components/config/easyFormGenerator/stepway.conf.easyFormConf';
import formlyConfig 										from './components/config/formly/stepway.conf.formly';
import translateConfig									from './components/translate/stepway.translate.module';

import easyFormStepWayCoreModule 				from './components/core/stepway.core.module';

import easyFormStepwayMainModule 				from './components/main/stepway.main.module';
import easyFormStepwayModalModule 			from './components/modal/stepway.editControlModal.module';
import easyFormStepwayModalProxyModule	from './components/modalControllerProxy/stepway.modalProxy.module';
import easyFormStepwayFormlyProxyModule	from './components/formlyProxy/stepway.formlyProxy.module';
import easyFormStepwayCommonModules			from './components/common/stepway.common.module';

const STEP_WAY_MODULE_NAME 		= 'eda.easyformGen.stepway';
const STEP_WAY_MODULES_INJECT = [
	easyFormStepWayCoreModule.name,
	translateConfig.name,
	easyFormStepwayMainModule.name,
	easyFormStepwayModalModule.name,
	easyFormStepwayModalProxyModule.name,
	easyFormStepwayFormlyProxyModule.name,
	easyFormStepwayCommonModules.name
];

let mainModule = angular
									.module(STEP_WAY_MODULE_NAME, STEP_WAY_MODULES_INJECT)
									.value(EASY_FORM_VERSION_NAME, EASY_FORM_VERSION_VALUE)
									.config(formlyConfig)
									.config(easyFormStepWayConfig);

export default mainModule;
