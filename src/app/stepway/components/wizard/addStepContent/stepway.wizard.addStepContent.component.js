const ADD_STEP_CONTENT_COMPONENT = 'addStepContent';

export const addStepContentComponent = {
  template: `
  <div>
    <div class="col-md-4">
      <add-step-command-panel
        configuration="$ctrl.configuration"
        add-newstep="$ctrl.addNewstep()"
        save-this-form="$ctrl.saveThisFormParent(event)">
      </add-step-command-panel>
    </div>
    <div class="col-md-8">
      <add-step-visual-panel
        configuration="$ctrl.configuration"
        set-active-step-number="$ctrl.setActiveStepNumberParent(index)"
        remove-this-step="$ctrl.removeThisStepParent(index)"
        right-this-step="$ctrl.rightThisStepParent(index)"
        left-this-step="$ctrl.leftThisStepParent(index)">
      </add-step-visual-panel>
    </div>
  </div>
  `,
  bindings: {
    configuration: '=',
    addNewstep: '&',
    setActiveStepNumber: '&',
    removeThisStep: '&',
    rightThisStep: '&',
    leftThisStep: '&',
    saveThisForm: '&',
  },
  controller: class addStepContentController {
    constructor() {

    }

    removeThisStepParent(index) {
      this.removeThisStep({
        index
      });
    }

    rightThisStepParent(index) {
      this.rightThisStep({
        index
      });
    }

    leftThisStepParent(index) {
      this.leftThisStep({
        index
      });
    }

    saveThisFormParent(event) {
      event.preventDefault();
      this.saveThisForm(event);
    }

    ///////////////////////////////////
    // WHY this function is needed :
    ///////////////////////////////////
    // CASE OF :  function with parameter passing from parent to caller through another level component
    //            parent -> intermediate component (here) -> caller
    // NOTE : intermediate should call parent function to be sure to pass function parameter upward to parent
    setActiveStepNumberParent(index) {
      this.setActiveStepNumber({
        index: index
      });
    }

    static get $inject() {
      return [];
    }
  }
};

export default addStepContentComponent;
export {
  ADD_STEP_CONTENT_COMPONENT
};