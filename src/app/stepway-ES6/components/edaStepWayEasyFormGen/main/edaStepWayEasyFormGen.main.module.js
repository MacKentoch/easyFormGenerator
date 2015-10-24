/* global angular */
import edaStepWayEasyFormGenController, {STEP_WAY_MAIN_CONTROLLER_NAME}   from './edaStepWayEasyFormGen.main.controller';
import edaStepWayEasyFormGenDirective,  {STEP_WAY_DIRECTIVE_NAME}         from './edaStepWayEasyFormGen.main.directive';
import easyFormSteWayConfig,            {EASY_FORM_STEP_WAY_CONFIG_NAME}  from './edaStepWayEasyFormGen.main.provider';

const  STEP_WAY_MAIN_MODULE = 'easyFormStepwayMainModule';
 
export default angular
                .module(STEP_WAY_MAIN_MODULE, [])
                .controller(STEP_WAY_MAIN_CONTROLLER_NAME,  edaStepWayEasyFormGenController)
                .directive(STEP_WAY_DIRECTIVE_NAME,         edaStepWayEasyFormGenDirective)
                .provider(EASY_FORM_STEP_WAY_CONFIG_NAME,   easyFormSteWayConfig);

