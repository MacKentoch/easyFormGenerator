import { IpAdressConfig }     from './IpAdress/config/stepway.IpAdress.config';
import {editIpAdressControlComponent, EDIT_IP_ADRESS_COMPONENT} from './IpAdress/editIpAdress/stepway.editIpAdress.component';
import { DateConfig }         from './Date/config/stepway.date.config';
import {editDateControlComponent, EDIT_DATE_COMPONENT} from './Date/editDate/stepway.editDate.component';
import { CheckBoxConfig }     from './CheckBox/config/stepway.checkbox.config';
import { EmailConfig }        from './Email/config/stepway.email.config';
import { BasicSelectConfig }  from './basicSelect/config/stepway.basicSelect.config';
import { BlankConfig }        from './blank/config/stepway.blank.config';

import { GroupedSelectConfig }  from './groupedSelect/config/stepway.groupedSelect.config';
import {editGroupedSelectControlComponent, EDIT_GROUPED_SELECT_COMPONENT} from './groupedSelect/editgroupedSelect/stepway.editgroupedSelect.component';

const configs = {
  IpAdressConfig,
  DateConfig,
  CheckBoxConfig,
  EmailConfig,
  BasicSelectConfig,
  BlankConfig,
  GroupedSelectConfig
};

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
  }
};

export {
  configs,
  controls
};
