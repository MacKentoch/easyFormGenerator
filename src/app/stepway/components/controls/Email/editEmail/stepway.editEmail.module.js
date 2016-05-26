import {
  editEmailControlComponent,
  EDIT_EMAIL_COMPONENT
} from './stepway.editEmail.component';

const editEmailControlModuleName = 'stepway.editEmailControl.module';

export default angular
                .module(editEmailControlModuleName, [])
                .component(EDIT_EMAIL_COMPONENT, editEmailControlComponent);
