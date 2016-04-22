import editModalController,  { EDIT_MODAL_CONTROLLER_NAME }                     from './stepway.editControlModal.controller';
import { editBlankControlComponent, EDIT_BLANK_CONTROL_COMPONENT }              from './editBlankControl/stepway.editBlankControl.component';
import { editBasicSelectControlComponent,  EDIT_BASIC_SELECT_COMPONENT }        from './editBasicSelectControl/stepway.editBasicSelectControl.component';
import { editCheckBoxControlComponent,  EDIT_CHECKBOX_COMPONENT }               from './editCheckBoxControl/stepway.editCheckBoxControl.component';
import { editDateControlComponent,  EDIT_DATE_COMPONENT }                       from './editDateControl/stepway.editDateControl.component';
import { editEmailControlComponent,  EDIT_EMAIL_COMPONENT }                     from './editEmailControl/stepway.editEmailControl.component';
import { editGroupedSelectControlComponent, EDIT_GROUPED_SELECT_COMPONENT }     from './editGroupedSelectControl/stepway.editGroupedSelectControl.component';
import { editHeaderControlComponent, EDIT_HEADER_CONTROL_COMPONENT }            from './editHeaderControl/stepway.editHeaderControl.component';
import { editPasswordControlComponent, EDIT_PASSWORD_CONTROL_COMPONENT }        from './editPasswordControl/stepway.editPasswordControl.component';
import { editRadioControlComponent, EDIT_RADIO_CONTROL_COMPONENT }              from './editRadioControl/stepway.editRadioControl.component';
import { editRichTextEditorControlComponent, EDIT_RICH_TEXT_EDITOR_COMPONENT }  from './editRichTextEditorControl/stepway.editRichTextEditorControl.component';
import { editSubTitleControlComponent, EDIT_SUBTITLE_CONTROL_COMPONENT }        from './editSubTitleControl/stepway.editSubTitleControl.component';
import { editTextareaControlComponent, EDIT_TEXTAREA_CONTROL_COMPONENT }        from './editTextareaControl/stepway.editTextareaControl.component';
import { editTextInputControlComponent, EDIT_TEXTINPUT_CONTROL_COMPONENT }      from './editTextInputControl/stepway.editTextInputControl.component';
import { editValidEditFooterComponent, EDIT_EDIT_VALID_FOOTER_COMPONENT }       from './editValidEditFooter/stepway.editValidEditFooter.component';
import { editChooseControlComponent, EDIT_CHOOSE_CONTROL_COMPONENT }            from './editChooseControl/stepway.editChooseControl.component';
import { editIpAdressControlComponent,  EDIT_IP_ADRESS_COMPONENT }              from './editIpAdressControl/stepway.editIpAdressControl.component';

const EDIT_CONTROLE_MODAL_NAME = 'editControlModal.module';

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
                .component(EDIT_PASSWORD_CONTROL_COMPONENT, editPasswordControlComponent)
                .component(EDIT_RADIO_CONTROL_COMPONENT, editRadioControlComponent)
                .component(EDIT_RICH_TEXT_EDITOR_COMPONENT, editRichTextEditorControlComponent)
                .component(EDIT_SUBTITLE_CONTROL_COMPONENT, editSubTitleControlComponent)
                .component(EDIT_TEXTAREA_CONTROL_COMPONENT, editTextareaControlComponent)
                .component(EDIT_TEXTINPUT_CONTROL_COMPONENT, editTextInputControlComponent)
                .component(EDIT_EDIT_VALID_FOOTER_COMPONENT, editValidEditFooterComponent)
                .component(EDIT_CHOOSE_CONTROL_COMPONENT, editChooseControlComponent)
                .component(EDIT_IP_ADRESS_COMPONENT, editIpAdressControlComponent);
