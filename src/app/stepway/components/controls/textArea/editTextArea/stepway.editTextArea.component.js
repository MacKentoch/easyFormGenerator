import editTextareaControlTemplate from './stepway.editTextArea.template.html';

export const EDIT_TEXTAREA_CONTROL_COMPONENT = 'editTextareaControl';

export const editTextareaControlComponent = {
  template      : editTextareaControlTemplate,
  bindings      : {
    nyaSelect: '='
  },
  controller    :
  class editTextareaControlController {
    constructor() {
      //
    }

    static get $inject() {
      return [];
    }
  }
};
