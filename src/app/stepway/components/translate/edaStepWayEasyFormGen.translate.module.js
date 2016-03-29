/* global angular */
import translateConfig, {TRANSLATE_CONFIG} from './edaStepWayEasyFormGen.translate';

const TRANSLATE_MODULE = 'eda.easyFormGenerator.translate';

export default angular
								.module(TRANSLATE_MODULE, [])
								.config(translateConfig);