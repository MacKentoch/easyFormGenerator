import { BlankConfig } from './blank/config/blank.config';
import editBlankModule, {editBlankControlComponent, EDIT_BLANK_CONTROL_COMPONENT} from './blank/editBlank/editBlankControl.component';

import { IpAdressConfig } from './IpAdress/config/IpAdress.config';
import editIpAdressModule, {editIpAdressControlComponent, EDIT_IP_ADRESS_COMPONENT} from './IpAdress/editIpAdress/editIpAdress.component';

import { DateConfig } from './Date/config/date.config';
import editDateModule, {editDateControlComponent, EDIT_DATE_COMPONENT} from './Date/editDate/editDate.component';

import { CheckBoxConfig } from './CheckBox/config/checkbox.config';
import editCheckBoxModule, {editCheckBoxControlComponent, EDIT_CHECKBOX_COMPONENT} from './CheckBox/editCheckBox/editCheckBox.component';

import { EmailConfig } from './Email/config/email.config';
import editEmailControlModule, {editEmailControlComponent, EDIT_EMAIL_COMPONENT} from './Email/editEmail/editEmail.component';

import { BasicSelectConfig } from './basicSelect/config/basicSelect.config';
import editBasicSelectModule, { editBasicSelectControlComponent, EDIT_BASIC_SELECT_COMPONENT } from './basicSelect/editBasicSelect/editBasicSelect.component';

import { GroupedSelectConfig } from './groupedSelect/config/groupedSelect.config';
import editGroupedSelectModule, {editGroupedSelectControlComponent, EDIT_GROUPED_SELECT_COMPONENT} from './groupedSelect/editGroupedSelect/editGroupedSelect.component';

import { HeaderConfig } from './header/config/header.config';
import editHeaderControl, {editHeaderControlComponent, EDIT_HEADER_CONTROL_COMPONENT} from './header/editHeader/editHeaderControl.component';

import { PasswordConfig } from './password/config/password.config';
import editPasswordModule, {editPasswordControlComponent, EDIT_PASSWORD_CONTROL_COMPONENT} from './password/editPassword/editPassword.component';

import { RadioConfig } from './radio/config/radio.config';
import editRadioModule, {editRadioControlComponent, EDIT_RADIO_CONTROL_COMPONENT} from './radio/editRadio/editRadio.component';

import { RichTextEditorConfig }  from './richTextEditor/config/richTextEditor.config';
import editRichTextEditorModule, {editRichTextEditorControlComponent, EDIT_RICH_TEXT_EDITOR_COMPONENT} from './richTextEditor/editRichTextEditor/editRichTextEditor.component';

import { SubTitleConfig }  from './subTitle/config/subTitle.config';
import editSubTitle, {editSubTitleControlComponent, EDIT_SUBTITLE_CONTROL_COMPONENT} from './subTitle/editSubTitle/editSubTitle.component';

import { TextAreaConfig }  from './textArea/config/textArea.config';
import editTextareaControlModule, {editTextareaControlComponent, EDIT_TEXTAREA_CONTROL_COMPONENT} from './textArea/editTextArea/editTextArea.component';

import { TextInputConfig }  from './textInput/config/textInput.config';
import editTextInputControlModule, {editTextInputControlComponent, EDIT_TEXTINPUT_CONTROL_COMPONENT} from './textInput/editTextInput/editTextInput.component';

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
    moduleName: editBasicSelectModule.name
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
