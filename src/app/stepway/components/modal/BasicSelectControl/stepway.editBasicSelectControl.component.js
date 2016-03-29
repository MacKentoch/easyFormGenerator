import editBasicSelectTemplate from './stepway.editBasicSelectControl.template.html!text';

const EDIT_BASIC_SELECT_COMPONENT = 'editBasicSelectControl';

function leftPanelBasicSelectControl() {
  let directive = {
    restrict : 'E',
    template : BasicSelectControlTemplate
  };
  return directive;
}

leftPanelBasicSelectControl.$inject = [];

export default leftPanelBasicSelectControl;

export {
  EDIT_BASIC_SELECT_COMPONENT
};
