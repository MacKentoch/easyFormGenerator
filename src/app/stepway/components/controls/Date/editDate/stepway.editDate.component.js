import editDateControlTemplate from './stepway.editDate.template.html';

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
