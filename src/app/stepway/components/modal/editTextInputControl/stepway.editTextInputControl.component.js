import editTextInputControlTemplate from './stepway.editTextInputControl.template.html!text';

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
