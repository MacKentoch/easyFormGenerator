
import leftPanelTextInputControlTemplate from './edaDragDropWay.leftpanel.textInputControl.template.html';

const LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE = 'leftPanelTextInputControl';

function leftPanelTextInputControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelTextInputControlTemplate
  };
  return directive;
}

leftPanelTextInputControl.$inject = [];

export default leftPanelTextInputControl;

export {
  LEFT_PANEL_TEXT_INPUT_CONTROL_DIRECTIVE
};
