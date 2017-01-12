export const EDIT_BLANK_CONTROL_COMPONENT = 'editBlankControl';

export const editBlankControlComponent = {
  template: `
  <div ng-switch-when="empty">
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="row">
          <div class="col-md-12">
            <h5 class="greyText">
              <i class="fa fa-eye"></i>
              &nbsp;
              {{'PREVIEW_TAB' | translate}} :
            </h5>
          </div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-sm-12">
            <h5 class="text-center greyText">
              {{'COL_WILL_BE_BLANK' | translate}}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  bindings: {},
  controller:
  class editBlankControlController {
    static $inject = [];

    constructor() {
      //
    }
  }
};

const editBlankModuleName = 'stepway.editBlankControl.module';
export default angular
                .module(editBlankModuleName, [])
                .component(EDIT_BLANK_CONTROL_COMPONENT, editBlankControlComponent);
