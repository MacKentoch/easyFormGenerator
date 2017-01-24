import {
  STEP_WAY_MAIN_CONTROLLER_NAME,
  STEP_WAY_MAIN_CONTROLLERAS_NAME
}                                  from  './main.controller';

const STEP_WAY_DIRECTIVE_NAME = 'edaStepWayEasyFormGen';

function edaStepWayEasyFormGenDirective(
  $templateCache,
  $timeout,
  $formlyProxy,
  $modalProxy
) {

  const directive = {
    restrict: 'E',
    replace: false,
    template: `
      <section id="pageWfEdit">
        <div ng-init="">
          <div class="container">
            <section id="preview">
              <div id="preview-content">
                <div class="content-container">
                  <!-- taoster alert -->
                  <toaster-container
                    toaster-options="{
                      'position-class': 'toast-top-full-width',
                      'extendedTimeout':500,
                      'timeOut':500
                    }">
                  </toaster-container>
                  <uib-tabset justified="true">
                    <uib-tab
                      active="vm.tab.editTab.active"
                      heading="{{'EDIT_TAB' | translate}}">
                      <div class="row">
                        <step-indicator
                          configuration="vm.configuration"
                          go-to-step="vm.goToStep(index)">
                        </step-indicator>
                      </div>
                      <div class="row">
                        <pager
                          configuration="vm.configuration"
                          step-indicators="vm.stepIndicators"
                          next-config-step="vm.nextConfigStep()"
                          previous-config-step="vm.previousConfigStep()">
                        </pager>
                        <div
                          class="animate-switch-container"
                          ng-switch on="vm.configuration.listConfigStep[vm.configuration.configStepCounter]">
                          <step-zero-content
                            configuration="vm.configuration"
                            add-newline="vm.addNewline()"
                            down-this-line="vm.downThisLine(index)"
                            up-this-line="vm.upThisLine(index)"
                            remove-this-line="vm.removeThisLine(index)">
                          </step-zero-content>
                          <step-one-content
                            configuration="vm.configuration"
                            increase-number-of-columns="vm.increaseNumberOfColumns()"
                            decrease-number-of-columns="vm.decreaseNumberOfColumns()"
                            set-active-line-number="vm.setActiveLineNumber(index)">
                          </step-one-content>
                          <step-two-content
                            configuration="vm.configuration"
                            set-active-line-number="vm.setActiveLineNumber(index)"
                            show-modal-add-ctrl-to-column="vm.showModalAddCtrlToColumn(size, indexLine, numcolumn)">
                          </step-two-content>
                          <step-three-content
                            configuration="vm.configuration"
                            eda-data-model="vm.dataModel"
                            wf-form-fields="vm.wfFormFields"
                            on-submit="vm.onSubmit()"
                            save-this-form="vm.saveThisForm()">
                          </step-three-content>
                        </div>
                      </div>
                    </uib-tab>
                    <uib-tab
                      active="vm.tab.previewTab.active"
                      ng-if="vm.tab.previewTab.tabVisible && !vm.configuration.isWizard"
                      heading="{{'PREVIEW_TAB' | translate}}">
                      <div class="panel panel-default">
                        <div class="panel-body">
                          <!-- formly here -->
                          <form ng-submit="vm.onSubmit()">
                            <formly-form
                              id="previewFormlyForm"
                              model="vm.dataModel"
                              fields="vm.wfFormFields">
                              <span class="pull-right">
                                <button
                                  class="btn btn-primary"
                                  type="submit">
                                  {{vm.configuration.submitButtonText}}
                                </button>
                                <button
                                  class="btn btn-primary"
                                  type="cancel">
                                  {{vm.configuration.cancelButtonText}}
                                </button>
                              </span>
                            </formly-form>
                          </form>
                        </div>
                      </div>
                      <div
                        ng-if="vm.tab.previewTab.modelsVisible"
                        class="panel panel-default">
                        <div class="panel-body">
                          <p>{{'DATA_MODEL' | translate}}</p>
                          <pre>
                            {{vm.dataModel | json}}
                          </pre>
                        </div>
                      </div>
                      <div
                        ng-if="vm.tab.previewTab.modelsVisible"
                        class="panel panel-default">
                        <div class="panel-body">
                          <p>{{'FIELDS_MODEL' | translate}}</p>
                          <pre>
                            {{vm.wfFormFieldsOnlyNeededProperties | json}}
                          </pre>
                        </div>
                      </div>
                    </uib-tab>
                  </uib-tabset>
                </div>
              </div>
            </section>
            <hr/>
          </div>
        </div>
      </section>
    `,
    scope: {
      edaEasyFormGeneratorModel: '=',
      wizardStepGeneratorModel: '=',
      edaSaveFormEvent: '&edaSaveFormEvent'
    },
    controller: STEP_WAY_MAIN_CONTROLLER_NAME,
    controllerAs: STEP_WAY_MAIN_CONTROLLERAS_NAME,
    link: linkFct
  };
  return directive;

  function linkFct(scope){
    //watch "scope.easyFormGeneratorModel"
    scope.$watch(() => scope.edaEasyFormGeneratorModel,
      () => loadExistingConfigurationModel(),
      true
    );

    if (scope.wizardStepGeneratorModel){
      loadExistingConfigurationModel();
      scope.wizardStepGeneratorModel.configuration = scope.vm.configuration;
      scope.wizardStepGeneratorModel.edaFieldsModel            = scope.vm.configuration.lines;
      scope.wizardStepGeneratorModel.formlyFieldsModel         = scope.vm.wfFormFields;
      scope.wizardStepGeneratorModel.dataModel                 = scope.vm.dataModel;
      scope.vm.configuration.isWizard = true;
      if (scope.wizardStepGeneratorModel.loaded) {
        angular.copy(scope.wizardStepGeneratorModel.loaded.edaFieldsModel, scope.wizardStepGeneratorModel.edaFieldsModel);
        angular.copy(scope.wizardStepGeneratorModel.loaded.dataModel, scope.wizardStepGeneratorModel.dataModel);
        scope.wizardStepGeneratorModel.formlyFieldsModel.length = 0;
        angular.copy(scope.wizardStepGeneratorModel.loaded.formlyFieldsModel, scope.wizardStepGeneratorModel.formlyFieldsModel);
      }
    }

    //watch "scope.vm.returnSaveEvent"" = catch saving form event
    scope.$watch(() => scope.vm.returnSaveEvent,
      (newValue) => {
        if (newValue === true) {
          const _easyFormGeneratorModel = {
            formName                  : scope.vm.configuration.formName,
            btnSubmitText             : scope.vm.configuration.submitButtonText,
            btnCancelText             : scope.vm.configuration.cancelButtonText,
            edaFieldsModel            : scope.vm.configuration.lines,
            edaFieldsModelStringified : angular.toJson(scope.vm.configuration.lines),
            formlyFieldsModel         : scope.vm.wfFormFieldsOnlyNeededProperties,
            dataModel                 : scope.vm.dataModel
          };
          scope.edaSaveFormEvent({ edaEasyFormGeneratorModel : _easyFormGeneratorModel });
          //back to false, waiting next save event
          scope.vm.returnSaveEvent = false;
        }
      }
    );

    function loadExistingConfigurationModel(){
      if(angular.isDefined(scope.edaEasyFormGeneratorModel)){
        const configlines = [].concat(returnAttributeConfigurationLinesIfNotEmpty());
        scope.configurationLoaded = {};
        $formlyProxy.bindConfigurationLines(scope.configurationLoaded,configlines);
        /**
          * rebind special control properties :
          *
          * formly expression properties
          * Validators
          * Validation
          */
        $modalProxy.refreshControlFormlyExpressionProperties(scope.configurationLoaded);
        $modalProxy.refreshControlFormlyValidators(scope.configurationLoaded);
        $modalProxy.refreshControlFormlyValidation(scope.configurationLoaded);
        //apply configuration model
        scope.vm.configuration = angular.copy(scope.configurationLoaded);
        //apply formly model
        $formlyProxy.applyConfigurationToformlyModel(scope.configurationLoaded, scope.vm.wfFormFields, scope.vm.model);
        scope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
        scope.vm.dataModel                        = returnAttributeDataModelIfNotEmpty();
        scope.vm.configuration.formName           = angular.isString(scope.edaEasyFormGeneratorModel.formName)       ? scope.edaEasyFormGeneratorModel.formName       : '';
        scope.vm.configuration.submitButtonText   = angular.isString(scope.edaEasyFormGeneratorModel.btnSubmitText)  ? scope.edaEasyFormGeneratorModel.btnSubmitText  : 'Submit';
        scope.vm.configuration.cancelButtonText   = angular.isString(scope.edaEasyFormGeneratorModel.btnCancelText)  ? scope.edaEasyFormGeneratorModel.btnCancelText  : 'Cancel';
      }
    }

    function returnAttributeConfigurationLinesIfNotEmpty(){
      const edaEasyFormGeneratorModelToReturn = (
          angular.isArray(scope.edaEasyFormGeneratorModel.edaFieldsModel) ?  (
              scope.edaEasyFormGeneratorModel.edaFieldsModel.length > 0 ?
                scope.edaEasyFormGeneratorModel.edaFieldsModel
              : emptyEdaFieldsModel()
              )
          : emptyEdaFieldsModel()
      );
        return edaEasyFormGeneratorModelToReturn;
    }

    function returnAttributeDataModelIfNotEmpty(){
      const dataModelToReturn = (
          angular.isArray(scope.edaEasyFormGeneratorModel.dataModel)   ?  (
              scope.edaEasyFormGeneratorModel.dataModel.length > 0 ?
              scope.edaEasyFormGeneratorModel.dataModel
              : {}
              )
          : {}
      );
        return dataModelToReturn;
    }

    /**
      * empty fields model : to display at least an empty line
      * otherwise would look like ugly empty line like it were a bug
      */
    function emptyEdaFieldsModel(){
      const emptyModel = [
        {
          line: 1,
          activeColumn: 1,
          columns: [
            {
              numColumn: 1,
              exist: true,
              control: {
                type: 'none',
                key: 'none'
              }
            }
          ]
        }
      ];
      return emptyModel;
    }
  }
}

edaStepWayEasyFormGenDirective.$inject = [
  '$templateCache',
  '$timeout',
  '$formlyProxy',
  '$modalProxy'
];

export default edaStepWayEasyFormGenDirective;
export {STEP_WAY_DIRECTIVE_NAME};
