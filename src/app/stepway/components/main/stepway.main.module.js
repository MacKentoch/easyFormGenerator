import edaStepWayEasyFormGenController, {
  STEP_WAY_MAIN_CONTROLLER_NAME
}                                         from './stepway.main.controller';
import edaStepWayEasyFormGenDirective, {
  STEP_WAY_DIRECTIVE_NAME
}                                         from './stepway.main.directive';
import easyFormSteWayConfig, {
  EASY_FORM_STEP_WAY_CONFIG_NAME
}                                         from './stepway.main.provider';

const  STEP_WAY_MAIN_MODULE = 'easyFormStepwayMainModule';

export default angular
                .module(STEP_WAY_MAIN_MODULE, [])
                .controller(STEP_WAY_MAIN_CONTROLLER_NAME,  edaStepWayEasyFormGenController)
                .directive(STEP_WAY_DIRECTIVE_NAME,         edaStepWayEasyFormGenDirective)
                .provider(EASY_FORM_STEP_WAY_CONFIG_NAME,   easyFormSteWayConfig);
