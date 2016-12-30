export const STEP_THREE_VISUAL_PANEL_COMPONENT_NAME = 'stepThreeVisualPanel';

export const StepThreeVisualPanelComponent = {
  template: `
  <div id="visualPanel">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          <i class="fa fa-thumbs-o-up"></i>
          &nbsp;
          {{'FINAL_STEP' | translate}}
        </h3>
      </div>
      <div class="panel-body">
        <form ng-submit="vizPanel.onSubmit()">
          <formly-form
            id="saveFormlyFom"
            model="vizPanel.dataModel"
            fields="vizPanel.wfFormFields">
            <span class="pull-right">
            <button
              class="btn btn-primary"
              type="submit">
              {{vizPanel.configuration.submitButtonText}}
            </button>
            <button
              class="btn btn-primary"
              type="cancel">
              {{vizPanel.configuration.cancelButtonText}}
            </button>
            </span>
          </formly-form>
        </form>
      </div>
    </div>
  </div>
  `,
  controllerAs: 'vizPanel',
  bindings: {
    configuration: '=',
    dataModel: '<',
    wfFormFields: '=',
    onSubmit: '&'
  },
  controller:
  class StepThreeVisualPanelController {
    constructor() {

    }

    static get $inject() {
      return [];
    }
  }
};
