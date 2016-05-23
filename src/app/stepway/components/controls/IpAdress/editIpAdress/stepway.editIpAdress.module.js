import {
  editIpAdressControlComponent,
  EDIT_IP_ADRESS_COMPONENT
} from './stepway.editIpAdress.component';

const editIpAdressModuleName = 'stepway.editIpAdress.module';

export default angular
                .module(editIpAdressModuleName, [])
                .component(EDIT_IP_ADRESS_COMPONENT, editIpAdressControlComponent);
