import editValidEditFooterTemplate from './stepway.editValidEditFooter.template.html!text';

export const EDIT_TEXTINPUT_CONTROL_COMPONENT = 'editValidEditFooter';

export const editValidEditFooterComponent = {
  template      : editValidEditFooterTemplate,
  bindings      : {
    nyaSelect:  '=',
    ok:         '&',
    cancel:     '&'
  },
  controller    :
  class editValidEditFooterController {
    constructor() {
      //
    }

    static get $inject() {
      return [];
    }
  }
};
