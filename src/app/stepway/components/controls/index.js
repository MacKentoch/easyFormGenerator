import { BlankConfig }        from './blank/config/stepway.blank.config';
import {editBlankControlComponent, EDIT_BLANK_CONTROL_COMPONENT} from './blank/editBlank/stepway.editBlank.component';
import editBlankModule  from './blank/editBlank/stepway.editBlankControl.module';

import { IpAdressConfig }     from './IpAdress/config/stepway.IpAdress.config';
import {editIpAdressControlComponent, EDIT_IP_ADRESS_COMPONENT} from './IpAdress/editIpAdress/stepway.editIpAdress.component';
import editIpAdressModule  from './IpAdress/editIpAdress/stepway.editIpAdress.module';

import { DateConfig }         from './Date/config/stepway.date.config';
import {editDateControlComponent, EDIT_DATE_COMPONENT} from './Date/editDate/stepway.editDate.component';
import editDateModule from './Date/editDate/stepway.editDate.module';

import { CheckBoxConfig }     from './CheckBox/config/stepway.checkbox.config';
import {editCheckBoxControlComponent, EDIT_CHECKBOX_COMPONENT} from './CheckBox/editCheckBox/stepway.editCheckBox.component';
import editCheckBoxModule from './CheckBox/editCheckBox/stepway.editCheckBox.module';

import { EmailConfig }        from './Email/config/stepway.email.config';
import {editEmailControlComponent, EDIT_EMAIL_COMPONENT} from './Email/editEmail/stepway.editEmail.component';

import { BasicSelectConfig }  from './basicSelect/config/stepway.basicSelect.config';
import {editBasicSelectControlComponent, EDIT_BASIC_SELECT_COMPONENT} from './basicSelect/editBasicSelect/stepway.editbasicSelect.component';
import editbasicSelectModule  from './basicSelect/editBasicSelect/stepway.editBasicSelect.module';

import { GroupedSelectConfig }  from './groupedSelect/config/stepway.groupedSelect.config';
import {editGroupedSelectControlComponent, EDIT_GROUPED_SELECT_COMPONENT} from './groupedSelect/editgroupedSelect/stepway.editgroupedSelect.component';

import { HeaderConfig }  from './header/config/stepway.header.config';
import {editHeaderControlComponent, EDIT_HEADER_CONTROL_COMPONENT} from './header/editHeader/stepway.editHeaderSelect.component';

import { PasswordConfig }  from './password/config/stepway.password.config';
import {editPasswordControlComponent, EDIT_PASSWORD_CONTROL_COMPONENT} from './password/editPassword/stepway.editPassword.component';

import { RadioConfig }  from './radio/config/stepway.radio.config';
import {editRadioControlComponent, EDIT_RADIO_CONTROL_COMPONENT} from './radio/editRadio/stepway.editRadio.component';

import { RichTextEditorConfig }  from './richTextEditor/config/stepway.richTextEditor.config';
import {editRichTextEditorControlComponent, EDIT_RICH_TEXT_EDITOR_COMPONENT} from './richTextEditor/editRichTextEditor/stepway.editRichTextEditor.component';

import { SubTitleConfig }  from './subTitle/config/stepway.subTitle.config';
import {editSubTitleControlComponent, EDIT_SUBTITLE_CONTROL_COMPONENT} from './subTitle/editSubTitle/stepway.editSubTitle.component';
import editSubTitle from './subTitle/editSubTitle/stepway.editSubTitle.module';

import { TextAreaConfig }  from './textArea/config/stepway.textArea.config';
import {editTextareaControlComponent, EDIT_TEXTAREA_CONTROL_COMPONENT} from './textArea/editTextArea/stepway.editTextArea.component';
import editTextareaControlModule from './textArea/editTextArea/stepway.editTextArea.module';

// controls configs
const configs = {
  IpAdressConfig,
  DateConfig,
  CheckBoxConfig,
  EmailConfig,
  BasicSelectConfig,
  BlankConfig,
  GroupedSelectConfig,
  HeaderConfig,
  PasswordConfig,
  RadioConfig,
  RichTextEditorConfig,
  SubTitleConfig,
  TextAreaConfig
};

// controls component (for edit control modal)
const controls = {
  editBlank: {
    name: EDIT_BLANK_CONTROL_COMPONENT,
    component: editBlankControlComponent,
    moduleName: editBlankModule.name
  },
  editIpAdress: {
    name:       EDIT_IP_ADRESS_COMPONENT,
    component:  editIpAdressControlComponent,
    moduleName: editIpAdressModule
  },
  editDate: {
    name:       EDIT_DATE_COMPONENT,
    component:  editDateControlComponent,
    moduleName: editDateModule
  },
  editBasicSelect: {
    name: EDIT_BASIC_SELECT_COMPONENT,
    component: editBasicSelectControlComponent,
    moduleName: editbasicSelectModule.name
  },
  editGroupedSelect: {
    name: EDIT_GROUPED_SELECT_COMPONENT,
    component: editGroupedSelectControlComponent
  },
  editCheckBox: {
    name: EDIT_CHECKBOX_COMPONENT,
    component: editCheckBoxControlComponent,
    moduleName: editCheckBoxModule
  },
  editEmail: {
    name: EDIT_EMAIL_COMPONENT,
    component: editEmailControlComponent
  },
  editHeader: {
    name: EDIT_HEADER_CONTROL_COMPONENT,
    component: editHeaderControlComponent
  },
  editPassword: {
    name: EDIT_PASSWORD_CONTROL_COMPONENT,
    component: editPasswordControlComponent
  },
  editRadio: {
    name: EDIT_RADIO_CONTROL_COMPONENT,
    component: editRadioControlComponent
  },
  editRichTextEditor: {
    name: EDIT_RICH_TEXT_EDITOR_COMPONENT,
    component: editRichTextEditorControlComponent
  },
  editSubTitle: {
    name: EDIT_SUBTITLE_CONTROL_COMPONENT,
    component: editSubTitleControlComponent,
    moduleName: editSubTitle.name
  },
  editTextArea: {
    name: EDIT_TEXTAREA_CONTROL_COMPONENT,
    component: editTextareaControlComponent,
    moduleName: editTextareaControlModule.name
  }
};

export {
  configs,
  controls
};
