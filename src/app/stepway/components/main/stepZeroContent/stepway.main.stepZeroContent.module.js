import {
  stepZeroContentComponent,
  LINE_STEP_ZERO_CONTENT_COMPONENT
}                                       from './stepway.main.stepZeroContent.component';
import {
  STEP_ZERO_COMMAND_PANEL_COMPONENT_NAME,
  StepZeroCommandPanelComponent
}                                       from './stepway.main.StepZeroCommandPanel.component';
import {
  STEP_ZERO_VISUAL_PANEL_COMPONENT_NAME,
  StepZeroVisualPanelComponent
}                                       from './stepway.main.StepZeroVisualPanel.component';

const STEP_ZERO_CONTENT_COMPONENT_MODULE = 'stepway.stepZeroContent.module';

export default angular
                .module(STEP_ZERO_CONTENT_COMPONENT_MODULE, [])
                .component(LINE_STEP_ZERO_CONTENT_COMPONENT, stepZeroContentComponent)
                .component(STEP_ZERO_COMMAND_PANEL_COMPONENT_NAME, StepZeroCommandPanelComponent)
                .component(STEP_ZERO_VISUAL_PANEL_COMPONENT_NAME, StepZeroVisualPanelComponent);
