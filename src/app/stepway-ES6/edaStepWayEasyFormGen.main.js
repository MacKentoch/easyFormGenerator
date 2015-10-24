/* global angular */
import easyFormStepWayConfig, {
		EASY_FORM_VERSION_NAME, 
		EASY_FORM_VERSION_VALUE } 					from './components/edaStepWayEasyFormGen/config/edaStepWayEasyFormGen.conf.easyFormConf';
		
import easyFormStepWayCoreModule 				from './components/edaStepWayEasyFormGen/core/edaStepWayEasyFormGen.core.module';		
import formlyConfig 										from './components/edaStepWayEasyFormGen/config/edaStepWayEasyFormGen.conf.formly';
import easyFormStepwayMainModule 				from './components/edaStepWayEasyFormGen/main/edaStepWayEasyFormGen.main.module';
import easyFormStepwayModalModule 			from './components/edaStepWayEasyFormGen/modal/edaStepWayEasyFormGen.editControlModal.module';
import easyFormServices									from './components/edaStepWayEasyFormGen/common/edaStepWayEasyFormGen.common.module';

const STEP_WAY_MODULE_NAME 		= 'eda.easyformGen.stepway';
const STEP_WAY_MODULES_INJECT = [
	easyFormStepWayCoreModule.name, 
	easyFormStepwayMainModule.name,
	easyFormStepwayModalModule.name
];

let mainModule = angular
										.module(STEP_WAY_MODULE_NAME, STEP_WAY_MODULES_INJECT)
										.value(EASY_FORM_VERSION_NAME, EASY_FORM_VERSION_VALUE)
										.config(formlyConfig)
										.config(easyFormStepWayConfig);

export default mainModule;