import {
  editHeaderControlComponent,
  EDIT_HEADER_CONTROL_COMPONENT
} from './stepway.editHeaderControl.component';

const editHeaderControlModuleName = 'stepway.editHeaderControl.module';

export default angular
                .module(editHeaderControlModuleName, [])
                .component(EDIT_HEADER_CONTROL_COMPONENT, editHeaderControlComponent);
