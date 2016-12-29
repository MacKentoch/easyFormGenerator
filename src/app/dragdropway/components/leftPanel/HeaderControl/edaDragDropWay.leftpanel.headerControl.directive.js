import leftPanelHeaderControlTemplate from './edaDragDropWay.leftpanel.headerControl.template.html';

const LEFT_PANEL_HEADER_CONTROL_DIRECTIVE = 'leftPanelHeaderControl';

function leftPanelHeaderControl() {  
  let directive = {
    restrict : 'E',
    template : leftPanelHeaderControlTemplate
  };
  return directive;

}

leftPanelHeaderControl.$inject = [];

export default leftPanelHeaderControl;

export {
  LEFT_PANEL_HEADER_CONTROL_DIRECTIVE
};
