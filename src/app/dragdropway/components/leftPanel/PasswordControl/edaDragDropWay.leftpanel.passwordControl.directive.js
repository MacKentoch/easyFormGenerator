
import leftPanelPasswordControlTemplate from './edaDragDropWay.leftpanel.passwordControl.template.html';

const LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE = 'leftPanelPasswordControl';

function leftPanelPasswordControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelPasswordControlTemplate
  };
  return directive;
}

leftPanelPasswordControl.$inject = [];

export default leftPanelPasswordControl;

export {
  LEFT_PANEL_PASSWORD_CONTROL_DIRECTIVE
};
