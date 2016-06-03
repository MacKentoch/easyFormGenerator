import {
  stepThreeContentComponent,
  LINE_STEP_THREE_CONTENT_COMPONENT
}                                       from './stepway.main.stepThreeContent.component';
import {
  STEP_THREE_COMMAND_PANEL_COMPONENT_NAME,
  StepThreeCommandPanelComponent
}                                       from './StepThreeCommandPanel/stepway.main.StepThreeCommandPanel.component';
import {
  STEP_THREE_VISUAL_PANEL_COMPONENT_NAME,
  StepThreeVisualPanelComponent
}                                       from './StepThreeVisualPanel/stepway.main.StepThreeVisualPanel.component';

const STEP_THREE_CONTENT_COMPONENT_MODULE = 'stepway.stepThreeContent.module';

export default angular
                .module(STEP_THREE_CONTENT_COMPONENT_MODULE, [])
                .component(LINE_STEP_THREE_CONTENT_COMPONENT, stepThreeContentComponent)
                .component(STEP_THREE_COMMAND_PANEL_COMPONENT_NAME, StepThreeCommandPanelComponent)
                .component(STEP_THREE_VISUAL_PANEL_COMPONENT_NAME, StepThreeVisualPanelComponent);
