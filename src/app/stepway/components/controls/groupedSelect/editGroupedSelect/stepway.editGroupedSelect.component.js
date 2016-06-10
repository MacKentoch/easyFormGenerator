import editGroupedSelectControlTemplate from './stepway.editGroupedSelect.template.html!text';

export const EDIT_GROUPED_SELECT_COMPONENT = 'editGroupedSelectControl';

export const editGroupedSelectControlComponent = {
  template      : editGroupedSelectControlTemplate,
  bindings      : {
    nyaSelect:                  '=',
    groupedSelectRowCollection: '=',
    newOptionGroupedSelect:     '=',
    newGroupGroupedSelect:      '=',
    groupSelectGroupClick:      '=',
    GroupedSelectGroups:        '=',

    addNewOptionGroupedSelect:  '&',
    addNewGroupToGroupedSelect: '&',
    upThisGroupedSelectRow:     '&',
    downThisGroupedSelectRow:   '&',
    showGroupListToChoose:      '&',
    removeGroupedSelectRow:     '&'
  },
  controller    :
  class editGroupedSelectControlController {
    constructor() {

    }

    static get $inject() {
      return [];
    }
  }
};
