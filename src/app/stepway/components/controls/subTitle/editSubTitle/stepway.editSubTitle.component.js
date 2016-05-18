import editSubTitleControlTemplate from './stepway.editSubTitleControl.template.html!text';

export const EDIT_SUBTITLE_CONTROL_COMPONENT = 'editSubTitleControl';

export const editSubTitleControlComponent = {
  template      : editSubTitleControlTemplate,
  bindings      : {
    nyaSelect: '='
  },
  controller    :
  class editSubTitleControlController {
    constructor() {
      //
    }

    static get $inject() {
      return [];
    }
  }
};
