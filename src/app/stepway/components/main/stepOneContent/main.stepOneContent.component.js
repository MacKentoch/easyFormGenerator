import {
  STEP_ONE_COMMAND_PANEL_COMPONENT_NAME,
  StepOneCommandPanelComponent
}                                       from './StepOneCommandPanel/main.StepOneCommandPanel.component';
import {
  STEP_ONE_VISUAL_PANEL_COMPONENT_NAME,
  StepOneVisualPanelComponent
}                                       from './StepOneVisualPanel/main.StepOneVisualPanel.component';


export const LINE_STEP_CONTENT_COMPONENT = 'stepOneContent';

export const stepOneContentComponent = {
  template : `
  <div
    class="animate-switch"
    ng-switch-when="first">
    <div class="col-md-4">
      <step-one-command-panel
        configuration="$ctrl.configuration"
        increase-number-of-columns="$ctrl.increaseNumberOfColumns()"
        decrease-number-of-columns="$ctrl.decreaseNumberOfColumns()">
      </step-one-command-panel>
    </div>
    <div class="col-md-8">
      <step-one-visual-panel
        configuration="$ctrl.configuration"
        set-active-line-number="$ctrl.setActiveLineNumberParent(index)">
      </step-one-visual-panel>
    </div>
  </div>
  `,
  bindings : {
    configuration:              '=',
    increaseNumberOfColumns:    '&',
    decreaseNumberOfColumns:    '&',
    setActiveLineNumber:  '&'
  },
  controller:
  class stepOneContentController {
    static $inject = [];

    constructor() {
      //
    }
    ///////////////////////////////////
    // WHY this function is needed :
    ///////////////////////////////////
    // CASE OF :  function with parameter passing from parent to caller through another level component
    //            parent -> intermediate component (here) -> caller
    // NOTE : intermediate should call parent function to be sure to pass function parameter upward to parent
    setActiveLineNumberParent(index) {
      this.setActiveLineNumber({ index: index });
    }
  }
};


const STEP_ONE_CONTENT_COMPONENT_MODULE = 'stepway.stepOneContent.module';
export default angular
                .module(STEP_ONE_CONTENT_COMPONENT_MODULE, [])
                .component(LINE_STEP_CONTENT_COMPONENT, stepOneContentComponent)
                .component(STEP_ONE_COMMAND_PANEL_COMPONENT_NAME, StepOneCommandPanelComponent)
                .component(STEP_ONE_VISUAL_PANEL_COMPONENT_NAME, StepOneVisualPanelComponent);
