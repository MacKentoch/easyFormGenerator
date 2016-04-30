export const LINE_STEP_TWO_CONTENT_COMPONENT = 'stepTwoContent';

export const stepTwoContentComponent = {
  template : `
  <div
    class="animate-switch"
    ng-switch-when="second">
    <div class="col-md-4">


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


    </div>
    <div class="col-md-8">


      <div id="visualPanel">
        <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">
            <i class="fa fa-eye"></i>
            &nbsp;
            {{'VISUAL_PANEL' | translate}}
          </h3>
        </h3>
        </div>
        <div class="panel-body">
          <!-- lines / columns -->
          <ul class="list-group">
            <li
              class="list-group-item"
              ng-repeat="line in vm.configuration.lines track by $index">
                <!-- columns -->
                <div ng-switch on="line.columns.length">
                  <div
                    class="row linesList"
                    ng-switch-when="1">
                    <div
                      class="col-md-12 lineCommandButtons"
                      ng-show="vm.configuration.lines.length > 1">
                      <button
                        class="btn"
                        ng-class="{'btn-warning':($index + 1) !== vm.configuration.activeLine, 'btn-success': ($index + 1) === vm.configuration.activeLine}"
                        ng-click="vm.setActiveLineNumber($index + 1)">
                        <i
                          class="fa"
                          ng-class="{'fa-square-o': ($index + 1) !== vm.configuration.activeLine, 'fa-check-square-o': ($index + 1) === vm.configuration.activeLine}">
                        </i>
                      </button>
                    </div>
                    <div class="col-md-12">
                      <div class="col-md-12 well">
                        <button
                          class="btn btn-lg btn-block"
                          ng-class="{'btn-primary': !line.columns[0].control.edited, 'btn-success': line.columns[0].control.edited}"
                          ng-click="vm.showModalAddCtrlToColumn('', $index, 0)">
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
                      ng-show="vm.configuration.lines.length > 1">
                      <button
                        class="btn"
                        ng-class="{'btn-warning':($index + 1) !== vm.configuration.activeLine, 'btn-success': ($index + 1) === vm.configuration.activeLine}"
                        ng-click="vm.setActiveLineNumber($index + 1)">
                        <i
                          class="fa"
                          ng-class="{'fa-square-o': ($index + 1) !== vm.configuration.activeLine, 'fa-check-square-o': ($index + 1) === vm.configuration.activeLine}">
                        </i>
                      </button>
                    </div>
                    <div class="col-md-12">
                      <div class="col-md-6 well">
                        <button
                          class="btn btn-lg btn-block"
                          ng-class="{'btn-primary': !line.columns[0].control.edited, 'btn-success': line.columns[0].control.edited}"
                          ng-click="vm.showModalAddCtrlToColumn('', $index, 0)">
                          {{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}
                        </button>
                      </div>
                      <div class="col-md-6 well">
                        <button
                          class="btn btn-lg btn-block"
                          ng-class="{'btn-primary': !line.columns[1].control.edited, 'btn-success': line.columns[1].control.edited}"
                          ng-click="vm.showModalAddCtrlToColumn('', $index, 1)">
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
                      ng-show="vm.configuration.lines.length > 1">
                      <button
                        class="btn"
                        ng-class="{'btn-warning':($index + 1) !== vm.configuration.activeLine, 'btn-success': ($index + 1) === vm.configuration.activeLine}"
                        ng-click="vm.setActiveLineNumber($index + 1)">
                        <i
                          class="fa"
                          ng-class="{'fa-square-o': ($index + 1) !== vm.configuration.activeLine, 'fa-check-square-o': ($index + 1) === vm.configuration.activeLine}">
                        </i>
                      </button>
                    </div>
                    <div class="col-md-12">
                      <div class="col-md-4 well">
                        <button
                          class="btn btn-lg btn-block"
                          ng-class="{'btn-primary': !line.columns[0].control.edited, 'btn-success': line.columns[0].control.edited}"
                          ng-click="vm.showModalAddCtrlToColumn('', $index, 0)">
                          {{line.columns[0].control.type !== 'none'  ? line.columns[0].control.type + ' ' + line.columns[0].control.subtype || '' : 'column 1'}}
                        </button>
                      </div>
                      <div class="col-md-4 well">
                        <button
                          class="btn btn-lg btn-block"
                          ng-class="{'btn-primary': !line.columns[1].control.edited, 'btn-success': line.columns[1].control.edited}"
                          ng-click="vm.showModalAddCtrlToColumn('', $index, 1)">
                          {{line.columns[1].control.type !== 'none'  ? line.columns[1].control.type + ' ' + line.columns[1].control.subtype || '' : 'column 2'}}
                        </button>
                      </div>
                      <div class="col-md-4 well">
                        <button
                          class="btn btn-lg btn-block"
                          ng-class="{'btn-primary': !line.columns[2].control.edited, 'btn-success': line.columns[2].control.edited}"
                          ng-click="vm.showModalAddCtrlToColumn('', $index, 2)">
                          {{line.columns[2].control.type !== 'none'  ? line.columns[2].control.type + ' ' + line.columns[2].control.subtype || '' : 'column 3'}}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  bindings : {
    configuration:              '=',
    increaseNumberOfColumns:    '&',
    decreaseNumberOfColumns:    '&',
    setActiveLineNumberParent:  '&'
  },
  controller:
  class stepTwoContentController {
    constructor() {

    }

    ///////////////////////////////////
    // WHY this function is needed :
    ///////////////////////////////////
    // CASE OF :  function with parameter passing from parent to caller through another level component
    //            parent -> intermediate component (here) -> caller
    // NOTE : intermediate should call parent function to be sure to pass function parameter upward to parent
    setActiveLineNumberParent(index) {
      this.setActiveLineNumberParent({ index: index });
    }

    static get $inject() {
      return [];
    }
  }
};
