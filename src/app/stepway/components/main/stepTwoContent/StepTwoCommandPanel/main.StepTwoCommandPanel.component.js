export const STEP_TWO_COMMAND_PANEL_COMPONENT_NAME = 'stepTwoCommandPanel';

export const StepTwoCommandPanelComponent = {
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
            <h4 class="numberOfcolumsText text-center">
              - {{'APPLY_CTRL2COL' | translate}} -
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12" >
            <hr/>
            <blockquote>
              <p class="numberOfcolumsText">
                <i class="fa fa-minus"></i>
                &nbsp;
                {{'CLIC_TAP_2_OPEN' | translate}}.
              </p>
              <p class="numberOfcolumsText">
                <i class="fa fa-minus"></i>
                &nbsp;
                {{'SELECT_2_APPLY_COL' | translate}}.
              </p>
          </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  bindings: {

  },
  controller:
  class StepTwoCommandPanelController {
    static $inject = [];

    constructor() {
      //
    }
  }
};
