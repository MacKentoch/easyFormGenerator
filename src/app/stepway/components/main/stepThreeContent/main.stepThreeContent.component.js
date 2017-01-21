import {
  STEP_THREE_COMMAND_PANEL_COMPONENT_NAME,
  StepThreeCommandPanelComponent
}                                       from './StepThreeCommandPanel/main.StepThreeCommandPanel.component';
import {
  STEP_THREE_VISUAL_PANEL_COMPONENT_NAME,
  StepThreeVisualPanelComponent
}                                       from './StepThreeVisualPanel/main.StepThreeVisualPanel.component';

export const LINE_STEP_THREE_CONTENT_COMPONENT = 'stepThreeContent';

export const stepThreeContentComponent = {
  template : `
  <div
    class="animate-switch"
    ng-switch-when="third">
    <div class="col-md-4">
      <step-three-command-panel
        configuration="$ctrl.configuration"
        save-this-form="$ctrl.saveThisForm()">
      </step-three-command-panel>
    </div>
    <div class="col-md-8">
      <step-three-visual-panel
        configuration="$ctrl.configuration"
        eda-data-model="$ctrl.edaDataModel"
        wf-form-fields="$ctrl.wfFormFields"
        on-submit="$ctrl.onSubmit()">
      </step-three-visual-panel>
    </div>
  </div>
  `,
  bindings : {
    configuration:  '=',
    edaDataModel:   '=',
    wfFormFields:   '=',
    onSubmit:       '&',
    saveThisForm:   '&'
  },
  controller:
  class stepThreeContentController {
    static $inject  = [];

    constructor() {
      //
    }

    $onInit() {
      // console.log('stepThreeContentComponent init, edaDataModel: ', this.edaDataModel);
    }

    $onChange(changesObj) {
      // console.log('stepThreeContentComponent onChange, changesObj: ', changesObj);
    }
  }
};

const STEP_THREE_CONTENT_COMPONENT_MODULE = 'stepway.stepThreeContent.module';

export default angular
                .module(STEP_THREE_CONTENT_COMPONENT_MODULE, [])
                .component(LINE_STEP_THREE_CONTENT_COMPONENT, stepThreeContentComponent)
                .component(STEP_THREE_COMMAND_PANEL_COMPONENT_NAME, StepThreeCommandPanelComponent)
                .component(STEP_THREE_VISUAL_PANEL_COMPONENT_NAME, StepThreeVisualPanelComponent);
