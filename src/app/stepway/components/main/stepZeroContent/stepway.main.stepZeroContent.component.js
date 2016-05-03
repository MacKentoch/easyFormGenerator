export const LINE_STEP_CONTENT_COMPONENT = 'stepZeroContent';

export const stepOneContentComponent = {
  template : `
  <div
    class="animate-switch"
    ng-switch-when="first">
    <div class="col-md-4">
      <step-zero-command-panel
        configuration="$ctrl.configuration"
        increase-number-of-columns="$ctrl.configuration.increaseNumberOfColumns()"
        decrease-number-of-columns="$ctrl.configuration.decreaseNumberOfColumns()">
      </step-zero-command-panel>
    </div>
    <div class="col-md-8">
      <step-zero-visual-panel
        configuration="$ctrl.configuration"
        set-active-line-number="$ctrl.setActiveLineNumberParent(index)">
      </step-zero-visual-panel>
    </div>
  </div>
  `,
  bindings : {
    configuration:              '=',
    increaseNumberOfColumns:    '&',
    decreaseNumberOfColumns:    '&',
    setActiveLineNumberParent:  '&'
  },
  controller:
  class stepOneContentController {
    constructor() {

    }

    ///////////////////////////////////
    // WHY this function is needed :
    ///////////////////////////////////
    // CASE OF :  function with parameter passing from parent to caller through another level component
    //            parent -> intermediate component (here) -> caller
    // NOTE : intermediate should call parent function to be sure to pass function parameter upward to parent
    setActiveLineNumberParent(index) {
      this.setActiveLineNumberParent({ index: index });
    }

    static get $inject() {
      return [];
    }
  }
};

export default stepOneContentComponent;
export {
  LINE_STEP_CONTENT_COMPONENT
};
