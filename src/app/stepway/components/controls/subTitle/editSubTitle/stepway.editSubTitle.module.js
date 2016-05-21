import {
  editSubTitleControlComponent,
  EDIT_SUBTITLE_CONTROL_COMPONENT
} from './stepway.editTextareaControl.component';

const editSubTitleModuleName = 'stepway.editSubTitleControl.module';

export default angular
                .module(editSubTitleModuleName, [])
                .component(EDIT_SUBTITLE_CONTROL_COMPONENT, editSubTitleControlComponent);
