import leftPanelSubtitleControlTemplate from './edaDragDropWay.leftpanel.subtitleControl.template.html';

const LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE = 'leftPanelSubtitleControl';

function leftPanelSubtitleControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelSubtitleControlTemplate
  };
  return directive;
}

leftPanelSubtitleControl.$inject = [];

export default leftPanelSubtitleControl;

export {
  LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE
};
