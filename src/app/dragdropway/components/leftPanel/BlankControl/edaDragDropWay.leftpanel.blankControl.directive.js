import leftPanelBlankControlTemplate from './edaDragDropWay.leftpanel.blankControl.template.html';

const LEFT_PANEL_BLANK_CONTROL_DIRECTIVE = 'leftPanelBlankControl';

function leftPanelBlankControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelBlankControlTemplate
  };
  return directive;
}

leftPanelBlankControl.$inject = [];

export default leftPanelBlankControl;

export {
  LEFT_PANEL_BLANK_CONTROL_DIRECTIVE
};
