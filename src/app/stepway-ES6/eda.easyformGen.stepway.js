import './vendor';
import iGotTimeModule from './components/iGotTime/iGotTime.module';
import appConfig from './config/main.config';

const STEP_WAY_MODULE_NAME = 'eda.easyformGen.stepway';

let mainModule = angular
										.module(MAIN_MODULE_NAME, [ngwfApp.name])
										.value('easyFormGenVersion', 'v1.0.23')
										.config(formlyConfigFct)
										.config(easyFromConfigFct);

export default mainModule;