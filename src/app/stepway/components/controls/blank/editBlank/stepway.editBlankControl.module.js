import {
  editBlankControlComponent,
  EDIT_BLANK_CONTROL_COMPONENT
} from './stepway.editBlankControl.component';

const editBlankModuleName = 'stepway.editBlankControl.module';

export default angular
                .module(editBlankModuleName, [])
                .component(EDIT_BLANK_CONTROL_COMPONENT, editBlankControlComponent);
