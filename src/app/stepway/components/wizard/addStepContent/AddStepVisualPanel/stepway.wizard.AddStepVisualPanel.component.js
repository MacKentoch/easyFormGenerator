export const ADD_STEP_VISUAL_PANEL_COMPONENT_NAME = 'addStepVisualPanel';

export const AddStepVisualPanelComponent = {
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
        
        <wizard edit-mode="true" indicators-position="top" on-finish="finishedWizard()">
          <wz-step wz-title="{{$ctrl.configuration.steps[$index].title}}" ng-repeat="step in $ctrl.configuration.steps track by $index"  >
            <div class="row">
              <div class="col-md-12 lineCommandButton">
                <div class="col-md-3 pull-left">
                  <button
                    class="btn btn-warning"
                    title="{{'MOVE_STEP_LEFT' | translate}}"
                    ng-hide="$index==0"
                    ng-click="$ctrl.leftThisStep({index: $index})">
                    <i class="fa fa-arrow-left"></i>
                  </button>
                  <button
                    class="btn btn-warning"
                    title="{{'MOVE_STEP_RIGHT' | translate}}"
                    ng-hide="$index==($ctrl.configuration.steps.length-1)"
                    ng-click="$ctrl.rightThisStep({index: $index})">
                    <i class="fa fa-arrow-right"></i>
                  </button>
                </div>
                <div class="col-md-6 text-center"> 
                  <span class="addNewLine">
                    {{'STEP_TITLE' | translate}}:
                  </span>
                  <input class="addNewLine" 
                  title="{{'STEP_TITLE' | translate}}"
                  placeholder="{{'STEP_TITLE' | translate}}"
                  ng-model="$ctrl.configuration.steps[$index].title" 
                  type="text" />
                </div>
                <div class="col-md-3 pull-left">
                  <button
                    class="btn btn-danger pull-right"   
                    title="{{'DELETE_STEP' | translate}}"
                    ng-hide="$ctrl.configuration.steps.length <= 1"     
                    ng-click="$ctrl.removeThisStep({index: $index})">
                    <i class="fa fa-trash-o"></i>
                  </button>
                </div>
              </div>              
            </div>
            <eda-step-way-easy-form-gen
              wizard-step-generator-model="$ctrl.configuration.steps[$index].easyFormGeneratorModel"
              eda-save-form-event="$ctrl.saveForm(edaEasyFormGeneratorModel)">
            </eda-step-way-easy-form-gen>
            {{$ctrl.configuration.steps[$index] | json}}   
          </wz-step>                
        </wizard>
      </div>
    </div>
  </div>
  `,
  bindings: {
    configuration: '=',
    removeThisStep: '&',
    rightThisStep: '&',
    leftThisStep: '&',
  },
  controller: class AddStepVisualPanelController {
    constructor() {      
    }

    static get $inject() {
      return [];
    }
  }
};