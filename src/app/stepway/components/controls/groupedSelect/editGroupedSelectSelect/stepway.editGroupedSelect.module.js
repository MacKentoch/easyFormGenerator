import {
  editGroupedSelectControlComponent,
  EDIT_GROUPED_SELECT_COMPONENT
} from './stepway.editGroupedSelect.component';

const editGroupedSelectModuleName = 'stepway.editGroupedSelect.module';

export default angular
                .module(editGroupedSelectModuleName, [])
                .component(EDIT_GROUPED_SELECT_COMPONENT, editGroupedSelectControlComponent);
