import {
  STEP_ZERO_COMMAND_PANEL_COMPONENT_NAME,
  StepZeroCommandPanelComponent
}                                       from './StepZeroCommandPanel/main.StepZeroCommandPanel.component';
import {
  STEP_ZERO_VISUAL_PANEL_COMPONENT_NAME,
  StepZeroVisualPanelComponent
}                                       from './StepZeroVisualPanel/main.StepZeroVisualPanel.component';

export const LINE_STEP_ZERO_CONTENT_COMPONENT = 'stepZeroContent';

export const stepZeroContentComponent = {
  template : `
  <div
    class="animate-switch"
    ng-switch-when="init">
    <div class="col-md-4">
      <step-zero-command-panel
        add-newline="$ctrl.addNewline()">
      </step-zero-command-panel>
    </div>
    <div class="col-md-8">
      <step-zero-visual-panel
        configuration="$ctrl.configuration"
        down-this-line="$ctrl.downThisLineParent(index)"
        up-this-line="$ctrl.upThisLineParent(index)"
        remove-this-line="$ctrl.removeThisLineParent(index)"
        set-active-line-number="$ctrl.setActiveLineNumberParent(index)">
      </step-zero-visual-panel>
    </div>
  </div>
  `,
  bindings : {
    configuration:              '=',
    addNewline:                 '&',
    downThisLine:               '&',
    upThisLine:                 '&',
    removeThisLine:             '&'
  },
  controller:
  class stepZeroContentController {
    static $inject = [];

    constructor() {

    }

    ///////////////////////////////////
    // WHY this function is needed :
    ///////////////////////////////////
    // CASE OF :  function with parameter passing from parent to caller through another level component
    //            parent -> intermediate component (here) -> caller
    // NOTE : intermediate should call parent function to be sure to pass function parameter upward to parent
    setActiveLineNumberParent(index) {
      this.setActiveLineNumber({index});
    }

    removeThisLineParent(index) {
      this.removeThisLine({index});
    }

    upThisLineParent(index) {
      this.upThisLine({index});
    }

    downThisLineParent(index) {
      this.downThisLine({index});
    }
  }
};

const STEP_ZERO_CONTENT_COMPONENT_MODULE = 'stepway.stepZeroContent.module';

export default angular
                .module(STEP_ZERO_CONTENT_COMPONENT_MODULE, [])
                .component(LINE_STEP_ZERO_CONTENT_COMPONENT, stepZeroContentComponent)
                .component(STEP_ZERO_COMMAND_PANEL_COMPONENT_NAME, StepZeroCommandPanelComponent)
                .component(STEP_ZERO_VISUAL_PANEL_COMPONENT_NAME, StepZeroVisualPanelComponent);
