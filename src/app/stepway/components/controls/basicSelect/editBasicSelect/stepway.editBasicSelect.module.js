import {
  editBasicSelectControlComponent,
  EDIT_BASIC_SELECT_COMPONENT
} from './stepway.editBasicSelect.component';

const editBasicSelectModuleName = 'stepway.editBasicSelect.module';

export default angular
                .module(editBasicSelectModuleName, [])
                .component(EDIT_BASIC_SELECT_COMPONENT, editBasicSelectControlComponent);
