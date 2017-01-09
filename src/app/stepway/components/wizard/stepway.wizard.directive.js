import easyWizardFormTemplate from './stepway.wizard.template.html';
import {
  STEP_WAY_WIZARD_CONTROLLER_NAME,
  STEP_WAY_WIZARD_CONTROLLERAS_NAME
} from './stepway.wizard.controller';


const STEP_WAY_WIZARD_DIRECTIVE_NAME = 'edaStepWayEasyWizardFormGen';

function edaStepWayEasyWizardFormGenDirective(

) {

  const directive = {
    restrict: 'E',
    scope: {
      edaEasyFormGeneratorModel: '=',
      edaSaveFormEvent: '&edaSaveFormEvent'
    },
    controller: STEP_WAY_WIZARD_CONTROLLER_NAME,
    controllerAs: STEP_WAY_WIZARD_CONTROLLERAS_NAME,
    replace: false,
    template: easyWizardFormTemplate,
    link: linkFct
  };
  return directive;

  function linkFct(scope) {

    scope.$watch(() => scope.edaEasyFormGeneratorModel,
      () => loadExistingConfigurationModel(),
      true
    );

    //watch "scope.vm.returnSaveEvent"" = catch saving form eventscope.vm.wfFormFieldsOnlyNeededProperties = angular.copy(scope.vm.wfFormFields);
    scope.$watch(() => scope.vm.returnSaveEvent,
      (newValue) => {
        if (newValue === true) {

          const _easyFormGeneratorModel = scope.vm.configuration.steps.map((step) => {
            var easyFormGeneratorModel = step.easyFormGeneratorModel;
            easyFormGeneratorModel.formlyFieldsModel.forEach((model) => {
              delete model.formControl;
            });
            return {
              formName: step.title,
              // btnSubmitText: easyFormGeneratorModel.configuration.submitButtonText,
              // btnCancelText: easyFormGeneratorModel.configuration.cancelButtonText,
              edaFieldsModel: easyFormGeneratorModel.edaFieldsModel,
              edaFieldsModelStringified: easyFormGeneratorModel.edaFieldsModelStringified,
              formlyFieldsModel: easyFormGeneratorModel.formlyFieldsModel,
              dataModel: easyFormGeneratorModel.dataModel,
              //configuration: easyFormGeneratorModel.configuration
            };
          });

          scope.edaSaveFormEvent({
            edaEasyFormGeneratorModel: _easyFormGeneratorModel
          });
          //back to false, waiting next save event
          scope.vm.returnSaveEvent = false;
        }
      }
    );

    function loadExistingConfigurationModel() {
       const steps = scope.edaEasyFormGeneratorModel.map((step) => {
        const item = {
          title: step.formName,
          easyFormGeneratorModel: {
            configuration: step.configuration,
            edaFieldsModel: step.edaFieldsModel,
            edaFieldsModelStringified: step.edaFieldsModelStringified,
            formlyFieldsModel: step.formlyFieldsModel,
            dataModel: step.dataModel,
            loaded: {
              configuration: step.configuration,
              edaFieldsModel: step.edaFieldsModel,
              edaFieldsModelStringified: step.edaFieldsModelStringified,
              formlyFieldsModel: step.formlyFieldsModel,
              dataModel: step.dataModel,
            },
          }
        };
        return item;
      });
      scope.vm.configuration.steps = steps;
    }
  }
}

edaStepWayEasyWizardFormGenDirective.$inject = [];

export default edaStepWayEasyWizardFormGenDirective;
export {
  STEP_WAY_WIZARD_DIRECTIVE_NAME
};
