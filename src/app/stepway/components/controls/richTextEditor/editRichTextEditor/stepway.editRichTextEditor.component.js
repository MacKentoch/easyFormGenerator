import editRichTextEditorControlTemplate from './stepway.editRichTextEditor.template.html';

export const EDIT_RICH_TEXT_EDITOR_COMPONENT = 'editRichTextEditorControl';

export const editRichTextEditorControlComponent = {
  template      : editRichTextEditorControlTemplate,
  bindings      : {
    nyaSelect: '='
  },
  controller    :
  class editRichTextEditorControlController {
    constructor() {
      //
    }

    static get $inject() {
      return [];
    }
  }
};
