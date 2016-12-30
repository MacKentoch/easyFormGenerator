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
    constructor() {

    }

    $onInit() {
      // console.log('stepThreeContentComponent init, edaDataModel: ', this.edaDataModel);
    }

    $onChange(changesObj) {
      // console.log('stepThreeContentComponent onChange, changesObj: ', changesObj);
    }

    static get $inject() {
      return [];
    }
  }
};
