import editRichTextEditorControlTemplate from './stepway.editRichTextEditorControl.template.html!text';

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
