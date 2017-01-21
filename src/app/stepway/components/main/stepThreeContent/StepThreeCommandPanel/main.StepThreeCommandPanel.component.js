export const STEP_THREE_COMMAND_PANEL_COMPONENT_NAME = 'stepThreeCommandPanel';

export const StepThreeCommandPanelComponent = {
  template: `
  <div id="commandPanel" ng-if="!$ctrl.configuration.isWizard">
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
          <div class="col-xs-12">
            <div class="form-group">
              <label
                for="inputSubmitButtontext"
                class=" greyText control-label">
                {{'CUSTOM_SUBMIT_BTN' | translate}} :
              </label>
              <div class="">
                <input
                  type="text"
                  class="form-control"
                  id="inputSubmitButtontext"
                  placeholder=""
                  ng-model="$ctrl.configuration.submitButtonText">
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-xs-12">
            <div class="form-group">
              <label
                for="inputCancelButtontext"
                class=" greyText control-label">
                {{'CUSTOM_CANCEL_BTN' | translate}} :
              </label>
              <div class="">
                <input
                  type="text"
                  class="form-control"
                  id="inputCancelButtontext"
                  placeholder=""
                  ng-model="$ctrl.configuration.cancelButtonText">
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-xs-12">
            <div class="form-group">
              <label
                for="inputNameFormtext"
                class=" greyText control-label">
                {{'NAME_THIS_FORM' | translate}} :
              </label>
              <div class="">
                <input
                  type="text"
                  class="form-control"
                  id="inputNameFormtext"
                  placeholder=""
                  ng-model="$ctrl.configuration.formName">
              </div>
            </div>
          </div>
        </div>
        <button
          class="btn btn-primary btn-block btn-lg"
          ng-click="$ctrl.saveThisForm()">
          {{'SAVE_THIS_FORM' | translate}}
        </button>
      </div>
    </div>
  </div>
  `,
  bindings: {
    configuration:  '=',
    saveThisForm:   '&'
  },
  controller:
  class StepThreeCommandPanelController {
    static $inject = [];

    constructor() {
      //
    }
  }
};
