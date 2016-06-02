import {
  stepTwoContentComponent,
  LINE_STEP_TWO_CONTENT_COMPONENT
}                                       from './stepway.main.stepThreeContent.component';
import {
  STEP_TWO_COMMAND_PANEL_COMPONENT_NAME,
  StepTwoCommandPanelComponent
}                                       from './StepThreeCommandPanel/stepway.main.StepThreeCommandPanel.component';
import {
  STEP_TWO_VISUAL_PANEL_COMPONENT_NAME,
  StepTwoVisualPanelComponent
}                                       from './StepThreeVisualPanel/stepway.main.StepThreeVisualPanel.component';

const STEP_TWO_CONTENT_COMPONENT_MODULE = 'stepway.stepTwoContent.module';

export default angular
                .module(STEP_TWO_CONTENT_COMPONENT_MODULE, [])
                .component(LINE_STEP_TWO_CONTENT_COMPONENT, stepTwoContentComponent)
                .component(STEP_TWO_COMMAND_PANEL_COMPONENT_NAME, StepTwoCommandPanelComponent)
                .component(STEP_TWO_VISUAL_PANEL_COMPONENT_NAME, StepTwoVisualPanelComponent);
