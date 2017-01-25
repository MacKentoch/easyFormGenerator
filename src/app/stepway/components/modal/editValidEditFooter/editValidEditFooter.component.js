export const EDIT_EDIT_VALID_FOOTER_COMPONENT = 'editValidEditFooter';

export const editValidEditFooterComponent = {
  template: `
  <div class="modal-footer">
    <button
      class="btn btn-primary"
      ng-class="{'disabled': $ctrl.nyaSelect.selectedControl === 'none'}"
      ng-click="$ctrl.ok()">
      {{'OK' | translate}}
    </button>
    <button
      class="btn btn-warning"
      ng-click="$ctrl.cancel()">
      {{'CANCEL' | translate}}
    </button>
  </div>
  `,
  bindings      : {
    nyaSelect:  '=',
    ok:         '&',
    cancel:     '&'
  },
  controller    :
  class editValidEditFooterController {
    static $inject = [];

    constructor() {
      //
    }
  }
};
