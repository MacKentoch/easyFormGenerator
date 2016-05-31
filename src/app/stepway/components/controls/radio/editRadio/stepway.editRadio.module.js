import {
  editRadioControlComponent,
  EDIT_RADIO_CONTROL_COMPONENT
} from './stepway.editRadio.component';

const editRadioControlModuleName = 'stepway.editRadioControl.module';

export default angular
                .module(editRadioControlModuleName, [])
                .component(EDIT_RADIO_CONTROL_COMPONENT, editRadioControlComponent);
