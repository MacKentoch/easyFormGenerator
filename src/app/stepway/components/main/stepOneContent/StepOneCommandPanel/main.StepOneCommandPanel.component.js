export const STEP_ONE_COMMAND_PANEL_COMPONENT_NAME = 'stepOneCommandPanel';

export const StepOneCommandPanelComponent = {
  template: `
  <div id="commandPanel">
    <div class="panel panel-default">
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
            <h4 class="numberOfcolumsText text-center">
              <i>
                - {{'SELECTED_LINE' | translate}} -
              </i>
            </h4>
            <h4 class="numberOfcolumsText text-center">
              {{'NUMBER_OF_COLUMN' | translate}} :
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2 col-xs-offset-3 col-sm-2 col-sm-offset-3 col-md-2 col-md-offset-3">
            <button
              class="btn btn-primary pull-right btnMinusColumns"
              ng-click="$ctrl.decreaseNumberOfColumns()">
              <i class="fa fa-minus fa-1x"></i>
            </button>
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2 text-center">
            <span class="numberOfColumnsLabel ">
              {{$ctrl.configuration.lines[$ctrl.configuration.activeLine -1].columns.length}}
            </span>
          </div>
          <div class="col-xs-2 col-sm-2 col-md-2">
            <button
              class="btn btn-primary pull-left btnAddColumns"
              ng-click="$ctrl.increaseNumberOfColumns()">
              <i class="fa fa-plus fa-1x"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  bindings: {
    configuration:            '=',
    increaseNumberOfColumns:  '&',
    decreaseNumberOfColumns:  '&'
  },
  controller:
  class StepOneCommandPanelController {
    static $inject = [];

    constructor() {

    }
  }
};
