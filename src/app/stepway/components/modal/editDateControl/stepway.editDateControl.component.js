import editDateControlTemplate from './stepway.editDateControl.template.html!text';

export const EDIT_DATE_COMPONENT = 'editDateControl';

export const editDateControlComponent = {
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
