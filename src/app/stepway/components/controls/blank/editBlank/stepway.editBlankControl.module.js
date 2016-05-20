import {
  editBlankControlComponent,
  EDIT_BLANK_CONTROL_COMPONENT
} from './stepway.editBasicSelect.component';

const editBlankModuleName = 'stepway.editBlank.module';

export default angular
                .module(editBlankModuleName, [])
                .component(EDIT_BLANK_CONTROL_COMPONENT, editBlankControlComponent);
