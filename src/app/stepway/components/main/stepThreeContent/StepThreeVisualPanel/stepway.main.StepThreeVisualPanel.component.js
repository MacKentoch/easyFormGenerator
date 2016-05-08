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
        <form ng-submit="$ctrl.onSubmit()">
          <formly-form
            id="saveFormlyFom"
            model="$ctrl.dataModel"
            fields="$ctrl.wfFormFields">
            <span class="pull-right">
            <button
              class="btn btn-primary"
              type="submit">
              {{$ctrl.configuration.submitButtonText}}
            </button>
            <button
              class="btn btn-primary"
              type="cancel">
              {{$ctrl.configuration.cancelButtonText}}
            </button>
            </span>
          </formly-form>
        </form>
      </div>
    </div>
  </div>
  `,
  bindings: {
    configuration:  '=',
    dataModel:      '=',
    wfFormFields:   '=',
    onSubmit:       '&'
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
