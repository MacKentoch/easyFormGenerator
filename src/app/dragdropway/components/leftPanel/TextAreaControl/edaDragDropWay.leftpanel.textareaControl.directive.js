
import leftPanelTextareaControlTemplate from './edaDragDropWay.leftpanel.textareaControl.template.html';

const LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE = 'leftPanelTextareaControl';

function leftPanelTextareaControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelTextareaControlTemplate
  };
  return directive;
}

leftPanelTextareaControl.$inject = [];

export default leftPanelTextareaControl;

export {
  LEFT_PANEL_TEXTAREA_CONTROL_DIRECTIVE
};
