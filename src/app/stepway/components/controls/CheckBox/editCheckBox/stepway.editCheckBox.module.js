import {
  editCheckBoxControlComponent,
  EDIT_CHECKBOX_COMPONENT
} from './stepway.editCheckBox.component';

const editCheckBoxModuleName = 'stepway.editCheckBox.module';

export default angular
                .module(editCheckBoxModuleName, [])
                .component(EDIT_CHECKBOX_COMPONENT, editCheckBoxControlComponent);
