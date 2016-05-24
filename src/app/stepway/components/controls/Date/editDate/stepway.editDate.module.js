import {
  editDateControlComponent,
  EDIT_DATE_COMPONENT
} from './stepway.editDate.component';

const editDateControlModuleName = 'stepway.editDateControl.module';

export default angular
                .module(editDateControlModuleName, [])
                .component(EDIT_DATE_COMPONENT, editDateControlComponent);
