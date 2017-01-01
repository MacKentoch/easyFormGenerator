import editBasicSelectTemplate from './stepway.editBasicSelect.template.html';

export const EDIT_BASIC_SELECT_COMPONENT = 'editBasicSelectControl';

export const editBasicSelectControlComponent = {
  template: editBasicSelectTemplate,
  bindings: {
    nyaSelect: '=',
    basicSelectRowCollection: '=',
    newOptionBasicSelect: '=',
    addNewOptionBasicSelect: '&',
    upThisRow: '&',
    downThisRow: '&',
    removeRow: '&'
  },
  controller:
  class editBasicSelectController {
    constructor() {

    }

    static get $inject() {
      return [];
    }
  }
};
