import {
  stepIndicatorComponent,
  STEP_INDICATOR_COMPONENT_NAME
}                                       from './stepway.main.stepIndicator.component';

const STEP_INDICATOR_COMPONENT_MODULE = 'stepway.stepIndicator.module';

export default angular
                .module(STEP_INDICATOR_COMPONENT_MODULE, [])
                .component(STEP_INDICATOR_COMPONENT_NAME, stepIndicatorComponent);
