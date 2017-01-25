import editModalController, {
  EDIT_MODAL_CONTROLLER_NAME
}                                   from './editControlModal.controller';
import {
  editValidEditFooterComponent,
  EDIT_EDIT_VALID_FOOTER_COMPONENT
}                                   from './editValidEditFooter/editValidEditFooter.component';
import {
  editChooseControlComponent,
  EDIT_CHOOSE_CONTROL_COMPONENT
}                                   from './editChooseControl/editChooseControl.component';
import { controls }                 from '../controls/index';


const EDIT_CONTROLE_MODAL_NAME = 'editControlModal.module';

const EDIT_CONTROL_INJECT = controls.map(
  control => control.moduleName
);

export default angular
                .module(EDIT_CONTROLE_MODAL_NAME, EDIT_CONTROL_INJECT)
                .controller(EDIT_MODAL_CONTROLLER_NAME, editModalController)
                .component(EDIT_CHOOSE_CONTROL_COMPONENT, editChooseControlComponent)
                .component(EDIT_EDIT_VALID_FOOTER_COMPONENT, editValidEditFooterComponent);
