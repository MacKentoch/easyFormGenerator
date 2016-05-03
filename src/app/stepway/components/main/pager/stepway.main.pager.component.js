export const PAGER_COMPONENT_NAME = 'pager';

export const pagerComponent = {
  template: `
  <ul class="pager">
    <li ng-class="{'disabled':$ctrl.stepIndicators[0]}">
      <button
          class="btn btn-primary customPagerButton"
          ng-click="$ctrl.previousConfigStep()" >
        <i class="fa fa-arrow-left fa-2x pull-left"></i>
        <span class="pull-right">
          {{'PAGER_PREVIOUS' | translate}}
        </span>
      </button>
    </li>
    <li ng-class="{'disabled':$ctrl.stepIndicators[3]}">
      <button
        class="btn btn-primary customPagerButton"
        ng-click="$ctrl.nextConfigStep()">
        <span class="pull-left">
          {{'PAGER_NEXT' | translate}}
        </span>
        <i class="fa fa-arrow-right fa-2x pull-right"></i>
      </button>
    </li>
  </ul>
  `,
  bindings: {
    stepIndicators:     '<',
    nextConfigStep:     '&',
    previousConfigStep: '&'
  },
  controller:
  class pagerComponent {
    constructor() {

    }

    static get $inject() {
      return [];
    }
  }
};
