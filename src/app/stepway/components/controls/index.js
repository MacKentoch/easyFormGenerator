import { IpAdressConfig }     from './IpAdress/config/stepway.IpAdress.config';
import {editIpAdressControlComponent, EDIT_IP_ADRESS_COMPONENT} from './IpAdress/editIpAdress/stepway.editIpAdress.component';

import { DateConfig }         from './Date/config/stepway.date.config';
import {editDateControlComponent, EDIT_DATE_COMPONENT} from './Date/editDate/stepway.editDate.component';

import { CheckBoxConfig }     from './CheckBox/config/stepway.checkbox.config';
import {editCheckBoxControlComponent, EDIT_CHECKBOX_COMPONENT} from './CheckBox/editCheckBox/stepway.editCheckBox.component';

import { EmailConfig }        from './Email/config/stepway.email.config';
import {editEmailControlComponent, EDIT_EMAIL_COMPONENT} from './Email/editEmail/stepway.editEmail.component';

import { BasicSelectConfig }  from './basicSelect/config/stepway.basicSelect.config';
import { BlankConfig }        from './blank/config/stepway.blank.config';

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

import { TextAreaConfig }  from './textArea/config/stepway.textArea.config';
import {editTextareaControlComponent, EDIT_TEXTAREA_CONTROL_COMPONENT} from './textArea/editTextArea/stepway.editTextArea.component';


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
  editIpAdress: {
    name:       EDIT_IP_ADRESS_COMPONENT,
    component:  editIpAdressControlComponent
  },
  editDate: {
    name:       EDIT_DATE_COMPONENT,
    component:  editDateControlComponent
  },
  editGroupedSelect: {
    name: EDIT_GROUPED_SELECT_COMPONENT,
    component: editGroupedSelectControlComponent
  },
  editCheckBox: {
    name: EDIT_CHECKBOX_COMPONENT,
    component: editCheckBoxControlComponent
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
    component: editSubTitleControlComponent
  },
  editTextArea: {
    name: EDIT_TEXTAREA_CONTROL_COMPONENT,
    component: editTextareaControlComponent
  }
};

export {
  configs,
  controls
};
