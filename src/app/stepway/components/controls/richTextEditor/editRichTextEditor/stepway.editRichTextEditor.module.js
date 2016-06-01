import {
  editRichTextEditorControlComponent,
  EDIT_RICH_TEXT_EDITOR_COMPONENT
} from './stepway.editRichTextEditor.component';

const editRichTextEditorModuleName = 'stepway.editRichTextEditor.module';

export default angular
                .module(editRichTextEditorModuleName, [])
                .component(EDIT_RICH_TEXT_EDITOR_COMPONENT, editRichTextEditorControlComponent);
