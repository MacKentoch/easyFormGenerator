import {
  editSubTitleControlComponent,
  EDIT_SUBTITLE_CONTROL_COMPONENT
} from './stepway.editSubTitle.component';

const editSubTitleModuleName = 'stepway.editSubTitleControl.module';

export default angular
                .module(editSubTitleModuleName, [])
                .component(EDIT_SUBTITLE_CONTROL_COMPONENT, editSubTitleControlComponent);
