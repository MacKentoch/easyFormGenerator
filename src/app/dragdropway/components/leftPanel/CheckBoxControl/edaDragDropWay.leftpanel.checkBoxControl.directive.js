
import leftPanelCheckBoxControlTemplate from './edaDragDropWay.leftpanel.checkBoxControl.template.html';

const LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE = 'leftPanelCheckBoxControl';

function leftPanelCheckBoxControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelCheckBoxControlTemplate
  };
  return directive;
}

leftPanelCheckBoxControl.$inject = [];

export default leftPanelCheckBoxControl;

export {
  LEFT_PANEL_CHECKBOX_CONTROL_DIRECTIVE
};
