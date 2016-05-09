import edaStepWayEasyFormGenController, {
  STEP_WAY_MAIN_CONTROLLER_NAME
}                                         from './stepway.main.controller';
import edaStepWayEasyFormGenDirective, {
  STEP_WAY_DIRECTIVE_NAME
}                                         from './stepway.main.directive';
import easyFormSteWayConfig, {
  EASY_FORM_STEP_WAY_CONFIG_NAME
}                                         from './stepway.main.provider';
import pagerModule                        from './pager/stepway.main.pager.module';
import pageIndicatorModule                from './pageIndicator/stepway.main.pageIndicator.module';
import stepZeroContentModule              from './stepZeroContent/stepway.main.stepZeroContent.module';
import stepOneContentModule               from './stepOneContent/stepway.main.stepOneContent.module';
import stepTwoContentModule               from './stepTwoContent/stepway.main.stepTwoContent.module';
import stepThreeContentModule             from './stepThreeContent/stepway.main.stepThreeContent.module';

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
