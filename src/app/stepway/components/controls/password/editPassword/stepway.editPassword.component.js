import editPasswordControlTemplate from './stepway.editPassword.template.html';

export const EDIT_PASSWORD_CONTROL_COMPONENT = 'editPasswordControl';

export const editPasswordControlComponent = {
  template      : editPasswordControlTemplate,
  bindings      : {
    nyaSelect: '='
  },
  controller    :
  class editPasswordControlController {
    constructor() {
      //
    }

    static get $inject() {
      return [];
    }
  }
};
