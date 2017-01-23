export const STEP_ZERO_COMMAND_PANEL_COMPONENT_NAME = 'stepZeroCommandPanel';

export const StepZeroCommandPanelComponent = {
  template: `
  <div id="commandPanel">
    <div  class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          <i class="fa fa-keyboard-o"></i>
          &nbsp;
          {{'COMMAND_PANEL' | translate}}
        </h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-12">
            <span class="addNewLine">
              {{'ADD_NEW_LINE' | translate}} :
            </span>
            &nbsp;
            <button
              class="btn btn-primary"
              ng-click="$ctrl.addNewline()">
              <i class="fa fa-plus fa-1x"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  bindings: {
    addNewline: '&'
  },
  controller:
  class StepZeroCommandPanelController {
    static $inject = [];

    constructor() {
      //
    }
  }
};
