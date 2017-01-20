export const STEP_INDICATOR_COMPONENT_NAME = 'stepIndicator';

export const stepIndicatorComponent = {
  template: `
  <div class="row stepwizardTopmargin">
    <div class="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2">
      <div class="stepwizard">
        <div class="row stepwizard-row">
          <div class="stepwizard-step col-md-3">
            <button
              type="button"
              class="btn btn-circle"
              ng-click="$ctrl.goToStep({index:0})"
              ng-class="{'btn-primary': $ctrl.configuration.stepIndicators[0], 'btn-default': !$ctrl.configuration.stepIndicators[0]}" >
              0
            </button>
            <p>
              {{'WIZARD_LINES' | translate}}
            </p>
          </div>
          <div class="stepwizard-step col-md-3">
            <button
              type="button"
              class="btn btn-circle"
              ng-click="$ctrl.goToStep({index:1})"
              ng-class="{'btn-primary': $ctrl.configuration.stepIndicators[1], 'btn-default': !$ctrl.configuration.stepIndicators[1], 'disabled': ($ctrl.configuration.configStepCounter < 1)}"  >
              1
            </button>
            <p>
              {{'WIZARD_LAYOUT' | translate}}
            </p>
          </div>
          <div class="stepwizard-step col-md-3">
            <button
              type="button"
              class="btn btn-default btn-circle"
              ng-click="$ctrl.goToStep({index:2})"
              ng-class="{'btn-primary': $ctrl.configuration.stepIndicators[2], 'btn-default': !$ctrl.configuration.stepIndicators[2], 'disabled': ($ctrl.configuration.configStepCounter < 2)}" >
              2
            </button>
            <p>
              {{'WIZARD_CONTROLS' | translate}}
            </p>
          </div>
          <div class="stepwizard-step col-md-3" ng-if="!$ctrl.configuration.isWizard">
            <button
              type="button"
              class="btn btn-default btn-circle"
              ng-click="$ctrl.goToStep({index:3})"
              ng-class="{'btn-primary': $ctrl.configuration.stepIndicators[3], 'btn-default': !$ctrl.configuration.stepIndicators[3], 'disabled': ($ctrl.configuration.configStepCounter < 3)}" >
              3
            </button>
            <p>
              {{'WIZARD_SAVE' | translate}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  bindings: {
    configuration: '<',
    goToStep: '&'
  },
  controller:
  class stepIndicatorComponent {
    static $inject = [];

    constructor() {

    }
  }
};

const STEP_INDICATOR_COMPONENT_MODULE = 'stepway.stepIndicator.module';

export default angular
                .module(STEP_INDICATOR_COMPONENT_MODULE, [])
                .component(STEP_INDICATOR_COMPONENT_NAME, stepIndicatorComponent);
