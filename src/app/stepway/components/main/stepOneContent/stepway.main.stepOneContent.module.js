import {
  stepOneContentComponent,
  LINE_STEP_CONTENT_COMPONENT
}                                       from './stepway.main.stepOneContent.component';
import {
  STEP_ONE_COMMAND_PANEL_COMPONENT_NAME,
  StepOneCommandPanelComponent
}                                       from './StepOneCommandPanel/stepway.main.StepOneCommandPanel.component';
import {
  STEP_ONE_VISUAL_PANEL_COMPONENT_NAME,
  StepOneVisualPanelComponent
}                                       from './StepOneVisualPanel/stepway.main.StepOneVisualPanel.component';


const STEP_ONE_CONTENT_COMPONENT_MODULE = 'stepway.stepOneContent.module';

export default angular
                .module(STEP_ONE_CONTENT_COMPONENT_MODULE, [])
                .component(LINE_STEP_CONTENT_COMPONENT, stepOneContentComponent)
                .component(STEP_ONE_COMMAND_PANEL_COMPONENT_NAME, StepOneCommandPanelComponent)
                .component(STEP_ONE_VISUAL_PANEL_COMPONENT_NAME, StepOneVisualPanelComponent);
