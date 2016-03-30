import editBasicSelectTemplate from './stepway.editBasicSelectControl.template.html!text';

const EDIT_BASIC_SELECT_COMPONENT = 'editBasicSelectControl';

const editBasicSelectControl = {
  template      : editBasicSelectTemplate,
  controllerAs  : 'editBasicSelectCtrl',
  bindings      : {
    newOptionBasicSelect    : '=',
    basicSelectRowCollection: '=',
    basicSelectFilter       : '=',
    proxyModel              : '=',
    addNewOptionBasicSelect : '&',
    upThisRow               : '&',
    downThisRow             : '&',
    removeRow               : '&'
  }
};

export default editBasicSelectControl;

export {
  EDIT_BASIC_SELECT_COMPONENT
};
