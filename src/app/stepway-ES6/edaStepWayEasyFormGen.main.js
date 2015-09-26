import './edaStepWayEasyFormGen.vendor.adapter';
import edaStepWayEasyFormGenModule from './components/edaStepWayEasyFormGen/main/edaStepWayEasyFormGen.main.module';
import formlyConfig from './components/edaStepWayEasyFormGen/config/edaStepWayEasyFormGen.conf.easyFormConf';
import easyFormStepWayConfig from './components/edaStepWayEasyFormGen/config/edaStepWayEasyFormGen.conf.formly';
import {EASY_FORM_VERSION_NAME, EASY_FORM_VERSION_VALUE} from './config/edaStepWayEasyFormGen.config';

const STEP_WAY_MODULE_NAME = 'eda.easyformGen.stepway';

let mainModule = angular
										.module(MAIN_MODULE_NAME, [edaStepWayEasyFormGenModule.name])
										.value(EASY_FORM_VERSION_NAME, EASY_FORM_VERSION_VALUE)
										.config(formlyConfig)
										.config(easyFormStepWayConfig);

export default mainModule;