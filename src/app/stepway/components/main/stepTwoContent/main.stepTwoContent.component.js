import {
  STEP_TWO_COMMAND_PANEL_COMPONENT_NAME,
  StepTwoCommandPanelComponent
}                                       from './StepTwoCommandPanel/main.StepTwoCommandPanel.component';
import {
  STEP_TWO_VISUAL_PANEL_COMPONENT_NAME,
  StepTwoVisualPanelComponent
}                                       from './StepTwoVisualPanel/main.StepTwoVisualPanel.component';

export const LINE_STEP_TWO_CONTENT_COMPONENT = 'stepTwoContent';

export const stepTwoContentComponent = {
  template : `
  <div
    class="animate-switch"
    ng-switch-when="second">
    <div class="col-md-4">
      <step-two-command-panel></step-two-command-panel>
    </div>
    <div class="col-md-8">
      <step-two-visual-panel
        configuration="$ctrl.configuration"
        set-active-line-number="$ctrl.setActiveLineNumberParent(index)"
        show-modal-add-ctrl-to-column="$ctrl.showModalAddCtrlToColumnParent(size, indexLine, numcolumn)">
      </step-two-visual-panel>
    </div>
  </div>
  `,
  bindings : {
    configuration:            '=',
    setActiveLineNumber:      '&',
    showModalAddCtrlToColumn: '&'
  },
  controller:
  class stepTwoContentController {
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

    // Needed for same reason as setActiveLineNumberParent
    showModalAddCtrlToColumnParent(size, indexLine, numcolumn) {
      this.showModalAddCtrlToColumn({
        size,
        indexLine,
        numcolumn
      });
    }
  }
};

const STEP_TWO_CONTENT_COMPONENT_MODULE = 'stepway.stepTwoContent.module';

export default angular
                .module(STEP_TWO_CONTENT_COMPONENT_MODULE, [])
                .component(LINE_STEP_TWO_CONTENT_COMPONENT,       stepTwoContentComponent)
                .component(STEP_TWO_COMMAND_PANEL_COMPONENT_NAME, StepTwoCommandPanelComponent)
                .component(STEP_TWO_VISUAL_PANEL_COMPONENT_NAME,  StepTwoVisualPanelComponent);
