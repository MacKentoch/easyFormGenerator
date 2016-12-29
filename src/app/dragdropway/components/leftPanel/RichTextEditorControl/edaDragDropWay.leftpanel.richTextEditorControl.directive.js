
import leftPanelRichTextEditorControlTemplate from './edaDragDropWay.leftpanel.richTextEditorControl.template.html';

const LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE = 'leftPanelRichTextEditorControl';

function leftPanelRichTextEditorControl() {
  let directive = {
    restrict : 'E',
    template : leftPanelRichTextEditorControlTemplate
  };
  return directive;
}

leftPanelRichTextEditorControl.$inject = [];

export default leftPanelRichTextEditorControl;

export {
  LEFT_PANEL_RICH_TEXT_EDITOR_CONTROL_DIRECTIVE
};
