import editHeaderControlTemplate from './stepway.editHeaderControl.template.html!text';

export const EDIT_HEADER_CONTROL_COMPONENT = 'editHeaderControl';

export const editHeaderControl = {
  template      : editHeaderControlTemplate,
  bindings      : {
    nyaSelect: '='
  },
  controller    :
  class editHeaderControlController {
    constructor() {
      //
    }

    static get $inject() {
      return [];
    }
  }
};
