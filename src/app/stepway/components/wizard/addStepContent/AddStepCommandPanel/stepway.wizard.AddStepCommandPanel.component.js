export const ADD_STEP_COMMAND_PANEL_COMPONENT_NAME = 'addStepCommandPanel';

export const AddStepCommandPanelComponent = {
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
              {{'ADD_NEW_STEP' | translate}} :
            </span>
            &nbsp;
            <button
              class="btn btn-primary"
              ng-click="$ctrl.addNewstep()">
              <i class="fa fa-plus fa-1x"></i>
            </button>
          </div>          
        </div>
        <button
          class="btn btn-primary btn-block btn-lg"
          ng-click="$ctrl.saveThisForm({event: $event})">
          {{'SAVE_THIS_FORM' | translate}}
        </button>
      </div>
    </div>
  </div>
  `,
  bindings: {
    addNewstep: '&',
    saveThisForm: '&'
  },
  controller: class AddStepCommandPanelController {
    constructor() {

    }

    static get $inject() {
      return [];
    }
  }
};