import {
  editTextInputControlComponent,
  EDIT_TEXTINPUT_CONTROL_COMPONENT
} from './stepway.editTextInputControl.component';

const editTextInputControlModuleName = 'stepway.editTextInputControl.module';

export default angular
                .module(editTextInputControlModuleName, [])
                .component(EDIT_TEXTINPUT_CONTROL_COMPONENT, editTextInputControlComponent);
