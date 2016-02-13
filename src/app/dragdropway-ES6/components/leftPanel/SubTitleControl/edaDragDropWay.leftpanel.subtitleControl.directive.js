import leftPanelSubtitleControlTemplate from './edaDragDropWay.leftpanel.subtitleControl.template.html!text';

const LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE = 'leftPanelSubtitleControlControl';

function leftPanelSubtitleControlControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelSubtitleControlTemplate
  };
  return directive;
}

leftPanelSubtitleControlControl.$inject = [];

export default leftPanelSubtitleControlControl;

export {
  LEFT_PANEL_SUBTITLE_CONTROL_DIRECTIVE
};
