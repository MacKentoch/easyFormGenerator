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
  class stepZeroContentController {
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
