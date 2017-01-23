export const STEP_ZERO_VISUAL_PANEL_COMPONENT_NAME = 'stepZeroVisualPanel';

export const StepZeroVisualPanelComponent = {
  template: `
  <div id="visualPanel">
    <div  class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          <i class="fa fa-eye"></i>
          &nbsp;
          {{'VISUAL_PANEL' | translate}}
        </h3>
      </div>
      <div class="panel-body">
        <!-- lines -->
        <ul class="list-group">
          <li
            class="list-group-item"
            ng-repeat="line in $ctrl.configuration.lines track by $index">
            <!-- columns -->
            <div ng-switch on="line.columns.length">
              <div
                class="row linesList"
                ng-switch-when="1">
                <div
                  class="col-md-12 lineCommandButtons"
                  ng-show="$ctrl.configuration.lines.length > 1">
                  <button
                    class="btn btn-warning"
                    ng-hide="$index==0"
                    ng-click="$ctrl.upThisLine({index: $index})">
                    <i class="fa fa-arrow-up"></i>
                  </button>
                  <button
                    class="btn btn-warning"
                    ng-hide="$index==($ctrl.configuration.lines.length-1)"
                    ng-click="$ctrl.downThisLine({index: $index})">
                    <i class="fa fa-arrow-down"></i>
                  </button>
                  <button
                    class="btn btn-danger pull-right"
                    ng-click="$ctrl.removeThisLine({index: $index})">
                    <i class="fa fa-trash-o"></i>
                  </button>
                </div>
                <div class="col-md-12">
                  <div class="col-md-12 well">
                    <button
                      class="btn btn-lg btn-block  btn-default disabled">
                      {{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="row linesList"
                ng-switch-when="2">
                <div
                  class="col-md-12 lineCommandButtons"
                  ng-show="$ctrl.configuration.lines.length > 1">
                  <button
                    class="btn btn-warning"
                    ng-hide="$index==0"
                    ng-click="$ctrl.upThisLine({index: $index})">
                    <i class="fa fa-arrow-up"></i>
                  </button>
                  <button
                    class="btn btn-warning"
                    ng-hide="$index==($ctrl.configuration.lines.length-1)"
                    ng-click="$ctrl.downThisLine({index: $index})">
                    <i class="fa fa-arrow-down"></i>
                  </button>
                  <button
                    class="btn btn-danger pull-right"
                    ng-click="$ctrl.removeThisLine({index: $index})">
                    <i class="fa fa-trash-o"></i>
                  </button>
                </div>
                <div class="col-md-12">
                  <div class="col-md-6 well">
                    <button class="btn btn-lg btn-block  btn-default disabled">
                        {{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}
                    </button>
                  </div>
                  <div class="col-md-6 well">
                    <button class="btn btn-lg btn-block  btn-default disabled">
                        {{line.columns[1].control.type !== 'none'  ? line.columns[1].control.type + ' ' + line.columns[1].control.subtype || '' : 'column 2'}}
                    </button>
                  </div>
                </div>
              </div>
              <div
                class="row linesList"
                ng-switch-when="3">
                <div
                  class="col-md-12 lineCommandButtons"
                  ng-show="$ctrl.configuration.lines.length > 1">
                  <button
                    class="btn btn-warning"
                    ng-hide="$index==0"
                    ng-click="$ctrl.upThisLine({index: $index})">
                    <i class="fa fa-arrow-up"></i>
                  </button>
                  <button
                    class="btn btn-warning"
                    ng-hide="$index==($ctrl.configuration.lines.length-1)"
                    ng-click="$ctrl.downThisLine({index: $index})">
                    <i class="fa fa-arrow-down"></i>
                  </button>
                  <button
                    class="btn btn-danger
                    pull-right"
                    ng-click="$ctrl.removeThisLine({index: $index})">
                    <i class="fa fa-trash-o"></i>
                  </button>
                </div>
                <div class="col-md-12">
                  <div class="col-md-4 well">
                    <button class="btn btn-lg btn-block  btn-default disabled">
                      {{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}
                    </button>
                  </div>
                  <div class="col-md-4 well">
                    <button
                      class="btn btn-lg btn-block  btn-default disabled">
                      {{line.columns[1].control.type !== 'none'  ? line.columns[1].control.type + ' ' + line.columns[1].control.subtype || '' : 'column 2'}}
                    </button>
                </div>
                <div class="col-md-4 well">
                  <button
                    class="btn btn-lg btn-block  btn-default disabled">
                    {{line.columns[2].control.type !== 'none'  ? line.columns[2].control.type + ' ' + line.columns[2].control.subtype || '' : 'column 3'}}
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  `,
  bindings: {
    configuration:  '=',
    downThisLine:   '&',
    upThisLine:     '&',
    removeThisLine: '&'
  },
  controller:
  class StepZeroVisualPanelController {
    static $inject = [];

    constructor() {
      //
    }
  }
};
