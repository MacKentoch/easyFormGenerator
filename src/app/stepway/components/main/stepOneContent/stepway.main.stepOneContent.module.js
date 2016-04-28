import stepOneContentComponent, {
  LINE_STEP_CONTENT_COMPONENT
}                                     from './stepway.main.stepOneContent.component';
import {
  STEP_ONE_COMMAND_PANEL_COMPONENT_NAME,
  StepOneCommandPanelComponent
}                                      from './stepway.main.StepOneCommandPanel.component';

const STEP_ONE_CONTENT_COMPONENT_MODULE = '';

export default angular
                .module(STEP_ONE_CONTENT_COMPONENT_MODULE, [])
                .component(LINE_STEP_CONTENT_COMPONENT, stepOneContentComponent)
                .component(STEP_ONE_COMMAND_PANEL_COMPONENT_NAME, StepOneCommandPanelComponent);
