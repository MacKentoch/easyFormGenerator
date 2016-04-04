import editPasswordControlTemplate from './stepway.editPasswordControl.template.html!text';

export const EDIT_HEADER_CONTROL_COMPONENT = 'editPasswordControl';

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
