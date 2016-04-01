import editBasicSelectTemplate from './stepway.editBasicSelectControl.template.html!text';

export const EDIT_BASIC_SELECT_COMPONENT = 'editBasicSelectControl';

export const editBasicSelectControl = {
  template      : editBasicSelectTemplate,
  bindings      : {
    nyaSelect                 : '=',
    modelbasicSelect          : '=',
    basicSelectRowCollection  : '=',
    newOptionBasicSelect      : '=',
    addNewOptionBasicSelect   : '&',
    upThisRow                 : '&',
    downThisRow               : '&',
    removeRow                 : '&'
  },
  controller    :
  class editBasicSelectController {
    constructor() {

    }

    static get $inject() {
      return [];
    }
  }
};
