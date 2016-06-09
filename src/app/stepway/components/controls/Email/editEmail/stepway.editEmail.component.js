import editEmailControlTemplate from './stepway.editEmail.template.html!text';

export const EDIT_EMAIL_COMPONENT = 'editEmailControl';

export const editEmailControlComponent = {
  template      : editEmailControlTemplate,
  bindings      : {
    nyaSelect                 : '='
  },
  controller    :
  class editEmailControlController {
    constructor() {

    }

    static get $inject() {
      return [];
    }
  }
};
