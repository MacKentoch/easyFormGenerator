import { BlankConfig }        from './blank/config/stepway.blank.config';
import {editBlankControlComponent, EDIT_BLANK_CONTROL_COMPONENT} from './blank/editBlank/stepway.editBlankControl.component';
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
import editEmailControlModule from './Email/editEmail/stepway.editEmail.module';

import { BasicSelectConfig }  from './basicSelect/config/stepway.basicSelect.config';
import {editBasicSelectControlComponent, EDIT_BASIC_SELECT_COMPONENT} from './basicSelect/editBasicSelect/stepway.editbasicSelect.component';
import editbasicSelectModule  from './basicSelect/editBasicSelect/stepway.editBasicSelect.module';

import { GroupedSelectConfig }  from './groupedSelect/config/stepway.groupedSelect.config';
import {editGroupedSelectControlComponent, EDIT_GROUPED_SELECT_COMPONENT} from './groupedSelect/editgroupedSelect/stepway.editgroupedSelect.component';
import editGroupedSelectModule  from './groupedSelect/editGroupedSelect/stepway.editGroupedSelect.module';

import { HeaderConfig }  from './header/config/stepway.header.config';
import {editHeaderControlComponent, EDIT_HEADER_CONTROL_COMPONENT} from './header/editHeader/stepway.editHeaderControl.component';
import editHeaderControl from './header/editHeader/stepway.editHeaderControl.module';

import { PasswordConfig }  from './password/config/stepway.password.config';
import {editPasswordControlComponent, EDIT_PASSWORD_CONTROL_COMPONENT} from './password/editPassword/stepway.editPassword.component';
import editPasswordModule from './password/editPassword/stepway.editPassword.module';

import { RadioConfig }  from './radio/config/stepway.radio.config';
import {editRadioControlComponent, EDIT_RADIO_CONTROL_COMPONENT} from './radio/editRadio/stepway.editRadio.component';
import editRadioModule from './radio/editRadio/stepway.editRadio.module';

import { RichTextEditorConfig }  from './richTextEditor/config/stepway.richTextEditor.config';
import {editRichTextEditorControlComponent, EDIT_RICH_TEXT_EDITOR_COMPONENT} from './richTextEditor/editRichTextEditor/stepway.editRichTextEditor.component';
import editRichTextEditorModule from './richTextEditor/editRichTextEditor/stepway.editRichTextEditor.module';

import { SubTitleConfig }  from './subTitle/config/stepway.subTitle.config';
import {editSubTitleControlComponent, EDIT_SUBTITLE_CONTROL_COMPONENT} from './subTitle/editSubTitle/stepway.editSubTitle.component';
import editSubTitle from './subTitle/editSubTitle/stepway.editSubTitle.module';

import { TextAreaConfig }  from './textArea/config/stepway.textArea.config';
import {editTextareaControlComponent, EDIT_TEXTAREA_CONTROL_COMPONENT} from './textArea/editTextArea/stepway.editTextArea.component';
import editTextareaControlModule from './textArea/editTextArea/stepway.editTextArea.module';

import { TextInputConfig }  from './textInput/config/stepway.textInput.config';
import {editTextInputControlComponent, EDIT_TEXTINPUT_CONTROL_COMPONENT} from './textInput/editTextInput/stepway.editTextInput.component';
import editTextInputControlModule from './textInput/editTextInput/stepway.editTextInput.module';


// controls configs
const configs = [
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
  TextAreaConfig,
  TextInputConfig
];

// controls component (for edit control modal)
const controls = [
  // editBlankControl:
  {
    name:       EDIT_BLANK_CONTROL_COMPONENT,
    component:  editBlankControlComponent,
    moduleName: editBlankModule.name
  },
  // editIpAdress:
   {
    name:       EDIT_IP_ADRESS_COMPONENT,
    component:  editIpAdressControlComponent,
    moduleName: editIpAdressModule.name
  },
  // editDate:
  {
    name:       EDIT_DATE_COMPONENT,
    component:  editDateControlComponent,
    moduleName: editDateModule.name
  },
  // editBasicSelect:
  {
    name: EDIT_BASIC_SELECT_COMPONENT,
    component: editBasicSelectControlComponent,
    moduleName: editbasicSelectModule.name
  },
  // editGroupedSelect:
  {
    name: EDIT_GROUPED_SELECT_COMPONENT,
    component: editGroupedSelectControlComponent,
    moduleName: editGroupedSelectModule.name
  },
  // editCheckBox:
  {
    name: EDIT_CHECKBOX_COMPONENT,
    component: editCheckBoxControlComponent,
    moduleName: editCheckBoxModule.name
  },
  // editEmail:
  {
    name: EDIT_EMAIL_COMPONENT,
    component: editEmailControlComponent,
    moduleName: editEmailControlModule.name
  },
  // editHeader:
  {
    name: EDIT_HEADER_CONTROL_COMPONENT,
    component: editHeaderControlComponent,
    moduleName: editHeaderControl.name
  },
  // editPassword:
  {
    name: EDIT_PASSWORD_CONTROL_COMPONENT,
    component: editPasswordControlComponent,
    moduleName: editPasswordModule.name
  },
  // editRadio:
  {
    name: EDIT_RADIO_CONTROL_COMPONENT,
    component: editRadioControlComponent,
    moduleName: editRadioModule.name
  },
  // editRichTextEditor:
  {
    name: EDIT_RICH_TEXT_EDITOR_COMPONENT,
    component: editRichTextEditorControlComponent,
    moduleName: editRichTextEditorModule.name
  },
  // editSubTitle:
  {
    name: EDIT_SUBTITLE_CONTROL_COMPONENT,
    component: editSubTitleControlComponent,
    moduleName: editSubTitle.name
  },
  // editTextArea:
  {
    name: EDIT_TEXTAREA_CONTROL_COMPONENT,
    component: editTextareaControlComponent,
    moduleName: editTextareaControlModule.name
  },
  // editTextInput:
  {
    name: EDIT_TEXTINPUT_CONTROL_COMPONENT,
    component: editTextInputControlComponent,
    moduleName: editTextInputControlModule.name
  }
];

export {
  configs,
  controls
};
