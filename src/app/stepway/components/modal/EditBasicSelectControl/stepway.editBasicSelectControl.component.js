import editBasicSelectTemplate from './stepway.editBasicSelectControl.template.html!text';

export const EDIT_BASIC_SELECT_COMPONENT = 'editBasicSelectControl';

export const editBasicSelectControl = {
  template      : editBasicSelectTemplate,
  bindings      : {
    newOptionBasicSelect    : '=',
    basicSelectRowCollection: '=',
    basicSelectFilter       : '=',
    proxyModel              : '=',
    addNewOptionBasicSelect : '&',
    upThisRow               : '&',
    downThisRow             : '&',
    removeRow               : '&'
  },  
  controllerAs  : 'editBasicSelectCtrl',
  controller    :
  class editBasicSelectController {
    constructor() {

    }

    static get $inject() {
      return [];
    }
  }
};
