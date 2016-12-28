import editIpAdressControlTemplate from './stepway.editIpAdress.template.html!text';

export const EDIT_IP_ADRESS_COMPONENT = 'editIpAdressControl';

export const editIpAdressControlComponent = {
  template: editIpAdressControlTemplate,
  bindings: {
    nyaSelect: '='
  },
  controller:
  class editIpAdressControlController {
    constructor() {

    }

    static get $inject() {
      return [];
    }
  }
};
