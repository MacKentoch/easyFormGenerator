
import leftPanelRadioControlTemplate from './edaDragDropWay.leftpanel.radioControl.template.html';

const LEFT_PANEL_RADIO_CONTROL_DIRECTIVE = 'leftPanelRadioControl';

function leftPanelRadioControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelRadioControlTemplate
  };
  return directive;
}

leftPanelRadioControl.$inject = [];

export default leftPanelRadioControl;

export {
  LEFT_PANEL_RADIO_CONTROL_DIRECTIVE
};
