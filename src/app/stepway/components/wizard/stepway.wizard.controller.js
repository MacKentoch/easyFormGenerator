import {
  initDebugModel,
  initTabModel,
} from './stepway.wizard.controller.helpers';

const STEP_WAY_WIZARD_CONTROLLER_NAME = 'edaStepWayEasyWizardFormGenController';
const STEP_WAY_WIZARD_CONTROLLERAS_NAME = 'vm';

class edaStepWayEasyWizardFormGenController {

  constructor(
    WizardHandler,
    easyFormGenVersion,
    $filter,
    toaster,
    $timeout,
    $uibModal,
    $log,
    easyWizardFormStepWayConfig) {

    this.easyFormGenVersion = easyFormGenVersion;
    this.$filter = $filter;
    this.toaster = toaster;
    this.$timeout = $timeout;
    this.$modal = $uibModal;
    this.$log = $log;
    this.easyWizardFormStepWayConfig = easyWizardFormStepWayConfig;
    this.wizardHandler = WizardHandler;

    this.init();
  }

  init() {    
    this.dataModel = {};
    this.easyFormGeneratorVERSION = this.easyFormGenVersion;
    this.debug = initDebugModel();
    this.tab = initTabModel(this.easyWizardFormStepWayConfig.isPreviewPanelVisible(), this.easyWizardFormStepWayConfig.arePreviewModelsVisible());
    this.configuration = {}; //configuration model (contains array of lines which contains array of columns)
    this.nyaSelect = {};
    this.editControlModalSize = 'lg';
    this.previewLoadedForm = {
      fieldsModel: []
    };
    this.configurationLoaded = {};
    this.returnSaveEvent = false;
    this.configuration.steps = this.configuration.steps || [];
    this.configuration.steps.push({
      easyFormGeneratorModel: {}
    });

  }

  get wizard() {
    this.wizardInstance = this.wizardInstance || this.wizardHandler.wizard();
    return this.wizardInstance;
  }

  onSubmit() {    
    this.toaster.pop({
      type: 'info',
      timeout: 2000,
      title: 'it should save data model if it were not in editor',      
      showCloseButton: true
    });
      return true;
  }

  leftThisStep(indexStep) {
    if (indexStep > -1) {
      if (this.configuration.steps[indexStep - 1]) {
        var currentStepObj = this.configuration.steps[indexStep];
        this.configuration.steps.splice(indexStep, 1);
        this.configuration.steps.splice((indexStep - 1), 0, currentStepObj);
        this.wizard.goTo(indexStep - 1);
      }
    }
  }

  rightThisStep(indexStep) {
    if (indexStep > -1) {
      if (this.configuration.steps[indexStep + 1]) {
        var currentStepObj = this.configuration.steps[indexStep];
        this.configuration.steps.splice(indexStep, 1);
        this.configuration.steps.splice((indexStep + 1), 0, currentStepObj);
        this.wizard.goTo(indexStep + 1);
      }
    }
  }

  addNewstep() {
    this.configuration.steps = this.configuration.steps || [];
    this.configuration.steps.push({
      easyFormGeneratorModel: {}
    });
    this.wizard.goTo(this.configuration.steps.length - 1);
  }

  removeThisStep(index) {
    if (index > -1) {
      if (this.configuration.steps.length > 1) {
        this.configuration.steps.splice(index, 1);
        this.wizard.goTo(Math.max(index - 1, 0));
      } else {
        this.$timeout(function () {
          this.toaster.pop({
            type: 'warning',
            title: 'Last step',
            body: 'Can\'t delete the last step',
            showCloseButton: true
          });
        }, 100);
      }
    }
  }


  // previewExistingform(formlyform) {
  //   const configlines = JSON.parse(formlyform.formlyField);
  //   //here to replace with $scope.configuration : initialise configuration with lines
  //   this.configurationLoaded = {};
  //   this.$formlyProxy.bindConfigurationLines(this.configurationLoaded,configlines);
  //   this.$formlyProxy.applyConfigurationToformlyModel(this.configurationLoaded, this.previewLoadedForm.fieldsModel, this.dataModel);
  //   this.wfFormFieldsOnlyNeededProperties = angular.copy(this.wfFormFields);
  //   this.previewLoadedForm.cancelButtonText = formlyform.cancelButtonText;
  //   this.previewLoadedForm.submitButtonText = formlyform.submitButtonText;
  // }


  saveThisForm() {
    this.toaster.pop({
      type: 'wait',
      timeout: 3000,
      title: ': Form is being saved',
      body: 'Fake for demo: Wait.',
      showCloseButton: true
    });    
    this.returnSaveEvent = true;
    return true;
  }
}


const toInject = [
  'WizardHandler',
  'easyFormGenVersion',
  '$filter',
  'toaster',
  '$timeout',
  '$uibModal',
  '$log',
  'easyWizardFormStepWayConfig',
];

edaStepWayEasyWizardFormGenController.$inject = toInject;
export default edaStepWayEasyWizardFormGenController;
export {
  STEP_WAY_WIZARD_CONTROLLER_NAME,
  STEP_WAY_WIZARD_CONTROLLERAS_NAME
};