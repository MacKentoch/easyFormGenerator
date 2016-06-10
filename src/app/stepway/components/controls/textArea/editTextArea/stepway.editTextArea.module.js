import {
  editTextareaControlComponent,
  EDIT_TEXTAREA_CONTROL_COMPONENT
} from './stepway.editTextArea.component';

const edittextareaControlModuleName = 'stepway.editTextAreaControl.module';

export default angular
                .module(edittextareaControlModuleName, [])
                .component(EDIT_TEXTAREA_CONTROL_COMPONENT, editTextareaControlComponent);
