import editValidEditFooterTemplate from './stepway.editValidEditFooter.template.html!text';

export const EDIT_EDIT_VALID_FOOTER_COMPONENT = 'editValidEditFooter';

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
