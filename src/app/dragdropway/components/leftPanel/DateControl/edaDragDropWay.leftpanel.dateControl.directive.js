
import leftPanelDateControlTemplate from './edaDragDropWay.leftpanel.dateControl.template.html';

const LEFT_PANEL_DATE_CONTROL_DIRECTIVE = 'leftPanelDateControl';

function leftPanelDateControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelDateControlTemplate
  };
  return directive;
}

leftPanelDateControl.$inject = [];

export default leftPanelDateControl;

export {
  LEFT_PANEL_DATE_CONTROL_DIRECTIVE
};
