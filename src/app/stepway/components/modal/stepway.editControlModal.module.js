import editModalController, { EDIT_MODAL_CONTROLLER_NAME }                  from './stepway.editControlModal.controller';
import editBlankControlComponent, { EDIT_BLANK_CONTROL_COMPONENT }          from './editBlankControl/stepway.editBlankControl.component';
import editBasicSelectControlComponent, { EDIT_BASIC_SELECT_COMPONENT }     from './editBasicSelectControl/stepway.editBasicSelectControl.component';
import editCheckBoxControlComponent, { EDIT_CHECKBOX_COMPONENT }            from './editCheckBoxControl/stepway.editCheckBoxControl.component';
import editDateControlComponent, { EDIT_DATE_COMPONENT }                    from './editDateControl/stepway.editDateControl.component';
import editEmailControlComponent, { EDIT_EMAIL_COMPONENT }                  from './editEmailControl/stepway.editEmailControl.component';
import editGroupedSelectControlComponent, { EDIT_GROUPED_SELECT_COMPONENT } from './editGroupedSelectControl/stepway.editGroupedSelectControl.component';
import editHeaderControlComponent, { EDIT_HEADER_CONTROL_COMPONENT }        from './editHeaderControl/stepway.editHeaderControl.component';


const EDIT_CONTROLE_MODAL_NAME = 'editControlModalModule';

export default angular
								.module(EDIT_CONTROLE_MODAL_NAME, [])
								.controller(EDIT_MODAL_CONTROLLER_NAME, editModalController)
                .component(EDIT_BLANK_CONTROL_COMPONENT, editBlankControlComponent)
                .component(EDIT_BASIC_SELECT_COMPONENT, editBasicSelectControlComponent)
                .component(EDIT_CHECKBOX_COMPONENT, editCheckBoxControlComponent)
                .component(EDIT_DATE_COMPONENT, editDateControlComponent)
                .component(EDIT_EMAIL_COMPONENT, editEmailControlComponent)
                .component(EDIT_GROUPED_SELECT_COMPONENT, editGroupedSelectControlComponent)
                .component(EDIT_HEADER_CONTROL_COMPONENT, editHeaderControlComponent)
                ;
