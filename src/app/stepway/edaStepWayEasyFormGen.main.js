import './edaStepWayEasyFormGen.vendor.adapter';
import easyFormStepWayConfig, {
		EASY_FORM_VERSION_NAME,
		EASY_FORM_VERSION_VALUE } 					from './components/edaStepWayEasyFormGen/config/easyFormGenerator/edaStepWayEasyFormGen.conf.easyFormConf';
import formlyConfig 										from './components/edaStepWayEasyFormGen/config/formly/edaStepWayEasyFormGen.conf.formly';
import translateConfig									from './components/edaStepWayEasyFormGen/translate/edaStepWayEasyFormGen.translate.module';

import easyFormStepWayCoreModule 				from './components/edaStepWayEasyFormGen/core/edaStepWayEasyFormGen.core.module';

import easyFormStepwayMainModule 				from './components/edaStepWayEasyFormGen/main/edaStepWayEasyFormGen.main.module';
import easyFormStepwayModalModule 			from './components/edaStepWayEasyFormGen/modal/edaStepWayEasyFormGen.editControlModal.module';
import easyFormStepwayModalProxyModule	from './components/edaStepWayEasyFormGen/modalControllerProxy/edaStepWayFormGen.modalProxy.module';
import easyFormStepwayFormlyProxyModule	from './components/edaStepWayEasyFormGen/formlyProxy/edaStepWayEasyFormGen.formlyProxy.module';
import easyFormStepwayCommonModules			from './components/edaStepWayEasyFormGen/common/edaStepWayEasyFormGen.common.module';
import dropZoneModule                   from './components/edaStepWayEasyFormGen/dropzone/edaStepWayEasyFormGen.dropzone.module';

const STEP_WAY_MODULE_NAME 		= 'eda.easyformGen.stepway';
const STEP_WAY_MODULES_INJECT = [
	easyFormStepWayCoreModule.name,
	translateConfig.name,
	easyFormStepwayMainModule.name,
	easyFormStepwayModalModule.name,
	easyFormStepwayModalProxyModule.name,
	easyFormStepwayFormlyProxyModule.name,
	easyFormStepwayCommonModules.name,
  dropZoneModule.name
];

let mainModule = angular
										.module(STEP_WAY_MODULE_NAME, STEP_WAY_MODULES_INJECT)
										.value(EASY_FORM_VERSION_NAME, EASY_FORM_VERSION_VALUE)
										.config(formlyConfig)
										.config(easyFormStepWayConfig);

export default mainModule;
