import editBasicSelectTemplate from './stepway.editBasicSelect.template.html!text';

export const EDIT_BASIC_SELECT_COMPONENT = 'editBasicSelectControl';

export const editBasicSelectControlComponent = {
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
