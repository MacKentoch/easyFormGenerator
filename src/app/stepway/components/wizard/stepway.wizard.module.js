import edaStepWayEasyWizardFormGenController, {
  STEP_WAY_WIZARD_CONTROLLER_NAME
}                                         from './stepway.wizard.controller';
import edaStepWayEasyWizardFormGenDirective, {
  STEP_WAY_WIZARD_DIRECTIVE_NAME
}                                         from './stepway.wizard.directive';
import easyWizardFormStepWayConfig, {
  EASY_WIZARD_FORM_STEP_WAY_CONFIG_NAME
}                                         from './stepway.wizard.provider';
import addStepContentModule             from './addStepContent/stepway.wizard.addStepContent.module';


const  STEP_WAY_WIZARD_MODULE = 'easyWizardFormStepwayModule';

const TO_INJECT = [
  addStepContentModule.name,
  'mgo-angular-wizard'
];

export default angular
                .module(STEP_WAY_WIZARD_MODULE, TO_INJECT)
                .controller(STEP_WAY_WIZARD_CONTROLLER_NAME, edaStepWayEasyWizardFormGenController)
                .directive(STEP_WAY_WIZARD_DIRECTIVE_NAME, edaStepWayEasyWizardFormGenDirective)
                .provider(EASY_WIZARD_FORM_STEP_WAY_CONFIG_NAME, easyWizardFormStepWayConfig);
