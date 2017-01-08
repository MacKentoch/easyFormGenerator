import {
  addStepContentComponent,
  ADD_STEP_CONTENT_COMPONENT
}                                       from './stepway.wizard.addStepContent.component';
import {
  ADD_STEP_COMMAND_PANEL_COMPONENT_NAME,
  AddStepCommandPanelComponent
}                                       from './AddStepCommandPanel/stepway.wizard.AddStepCommandPanel.component';
import {
  ADD_STEP_VISUAL_PANEL_COMPONENT_NAME,
  AddStepVisualPanelComponent
}                                       from './AddStepVisualPanel/stepway.wizard.AddStepVisualPanel.component';


const ADD_STEP_CONTENT_COMPONENT_MODULE = 'stepway.addStepContent.module';

export default angular
                .module(ADD_STEP_CONTENT_COMPONENT_MODULE, [])
                .component(ADD_STEP_CONTENT_COMPONENT, addStepContentComponent)
                .component(ADD_STEP_COMMAND_PANEL_COMPONENT_NAME, AddStepCommandPanelComponent)
                .component(ADD_STEP_VISUAL_PANEL_COMPONENT_NAME, AddStepVisualPanelComponent);
