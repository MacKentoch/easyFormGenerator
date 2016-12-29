import editRadioControlTemplate from './stepway.editRadio.template.html';

export const EDIT_RADIO_CONTROL_COMPONENT = 'editRadioControl';

export const editRadioControlComponent = {
  template      : editRadioControlTemplate,
  bindings      : {
    nyaSelect:          '=',
    radioRowCollection: '=',
    newOptionRadio:     '=',
    addNewOptionRadio:  '&',
    upThisRadioRow:     '&',
    downThisRadioRow:   '&',
    removeRadioRow:     '&'
  },
  controller    :
  class editRadioControlController {
    constructor() {
      //
    }

    static get $inject() {
      return [];
    }
  }
};
