import editTextInputControlTemplate from './stepway.editTextInput.template.html';

export const EDIT_TEXTINPUT_CONTROL_COMPONENT = 'editTextInputControl';

export const editTextInputControlComponent = {
  template      : editTextInputControlTemplate,
  bindings      : {
    nyaSelect: '='
  },
  controller    :
  class editTextInputControlController {
    constructor() {
      //
    }

    static get $inject() {
      return [];
    }
  }
};
