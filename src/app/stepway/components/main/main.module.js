import edaStepWayEasyFormGenController, {
  STEP_WAY_MAIN_CONTROLLER_NAME
}                                         from './main.controller';
import edaStepWayEasyFormGenDirective, {
  STEP_WAY_DIRECTIVE_NAME
}                                         from './main.directive';
import easyFormSteWayConfig, {
  EASY_FORM_STEP_WAY_CONFIG_NAME
}                                         from './main.provider';
import pagerModule                        from './pager/main.pager.component';
import pageIndicatorModule                from './stepIndicator/main.stepIndicator.component';
import stepZeroContentModule              from './stepZeroContent/main.stepZeroContent.component';
import stepOneContentModule               from './stepOneContent/main.stepOneContent.component';
import stepTwoContentModule               from './stepTwoContent/main.stepTwoContent.component';
import stepThreeContentModule             from './stepThreeContent/main.stepThreeContent.component';

const  STEP_WAY_MAIN_MODULE = 'easyFormStepwayMainModule';

const TO_INJECT = [
  pagerModule.name,
  pageIndicatorModule.name,
  stepZeroContentModule.name,
  stepOneContentModule.name,
  stepTwoContentModule.name,
  stepThreeContentModule.name
];

export default angular
                .module(STEP_WAY_MAIN_MODULE, TO_INJECT)
                .controller(STEP_WAY_MAIN_CONTROLLER_NAME,  edaStepWayEasyFormGenController)
                .directive(STEP_WAY_DIRECTIVE_NAME,         edaStepWayEasyFormGenDirective)
                .provider(EASY_FORM_STEP_WAY_CONFIG_NAME,   easyFormSteWayConfig);
