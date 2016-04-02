import editDateControlTemplate from './stepway.editDateControl.template.html!text';

export const EDIT_BASIC_SELECT_COMPONENT = 'editDateControl';

export const editDateControl = {
  template      : editDateControlTemplate,
  bindings      : {
    nyaSelect                 : '=',
    demodt                    : '=',
    dateOptions               : '=',
    open                      : '&'
  },
  controller    :
  class editDateControlController {
    constructor() {

    }

    static get $inject() {
      return [];
    }
  }
};
