
import leftPanelGroupedSelectControlTemplate from './edaDragDropWay.leftpanel.groupedSelectControl.template.html!text';

const LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE = 'leftPanelGroupedSelectControl';

function leftPanelGroupedSelectControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelGroupedSelectControlTemplate
  };
  return directive;
}

leftPanelGroupedSelectControl.$inject = [];

export default leftPanelGroupedSelectControl;

export {
  LEFT_PANEL_GROUPED_SELECT_CONTROL_DIRECTIVE
};
