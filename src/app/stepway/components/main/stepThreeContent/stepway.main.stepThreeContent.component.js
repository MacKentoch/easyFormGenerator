export const LINE_STEP_THREE_CONTENT_COMPONENT = 'stepThreeContent';

export const stepThreeContentComponent = {
  template : `
  <div
    class="animate-switch"
    ng-switch-when="third">
    <div class="col-md-4">
      <step-three-command-panel
        configuration="$ctrl.configuration"
        saveThisForm="$ctrl.saveThisForm()">
      </step-three-command-panel>
    </div>
    <div class="col-md-8">
      <step-three-visual-panel
        configuration="$ctrl.configuration"
        data-model="$ctrl.dataModel"
        wf-form-fields="$ctrl.wfFormFields"
        on-submit="$ctrl.onSubmit()">
      </step-three-visual-panel>
    </div>
  </div>
  `,
  bindings : {
    configuration:  '=',
    dataModel:      '<',
    wfFormFields:   '=',
    onSubmit:       '&',
    saveThisForm:   '&'
  },
  controller:
  class stepThreeContentController {
    constructor() {

    }

    $onInit() {
      console.log('stepThreeContentComponent init, dataModel: ', this.dataModel);
    }

    $onChange(changesObj) {
      console.log('stepThreeContentComponent onChange, changesObj: ', changesObj);
    }

    static get $inject() {
      return [];
    }
  }
};
