import leftPanelBasicSelectControlTemplate from './edaDragDropWay.leftpanel.basicSelectControl.template.html';

const LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE = 'leftPanelBasicSelectControl';

function leftPanelBasicSelectControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelBasicSelectControlTemplate
  };
  return directive;
}

leftPanelBasicSelectControl.$inject = [];

export default leftPanelBasicSelectControl;

export {
  LEFT_PANEL_BASIC_SELECT_CONTROL_DIRECTIVE
};
