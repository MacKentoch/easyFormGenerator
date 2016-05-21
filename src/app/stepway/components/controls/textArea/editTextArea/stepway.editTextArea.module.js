import {
  editTextareaControlComponent,
  EDIT_TEXTAREA_CONTROL_COMPONENT
} from './stepway.editTextareaControl.component';

const edittextareaControlModuleName = 'stepway.editTextareaControl.module';

export default angular
                .module(edittextareaControlModuleName, [])
                .component(EDIT_TEXTAREA_CONTROL_COMPONENT, editTextareaControlComponent);
