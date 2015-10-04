/* global angular */
import edaStepWayEasyFormGenDirective from './edaStepWayEasyFormGen.main.directive';
import easyFormSteWayConfig, {EASY_FORM_STEP_WAY_CONFIG_NAME} from './edaStepWayEasyFormGen.main.provider';

const STEP_WAY_DIRECTIVE_NAME = 'edaStepWayEasyFormGen';
  
export default angular
                .module(STEP_WAY_DIRECTIVE_NAME, [])
                .directive(STEP_WAY_DIRECTIVE_NAME, edaStepWayEasyFormGenDirective)
                .provider(EASY_FORM_STEP_WAY_CONFIG_NAME, easyFormSteWayConfig);

