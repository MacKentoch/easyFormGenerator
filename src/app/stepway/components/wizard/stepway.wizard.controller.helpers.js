/* global angular */
const DEBUG_MODEL = {
  showDebug : false,
  configurationModelNumberofLines : 1
};

const initDebugModel = () => angular.copy(DEBUG_MODEL);

const DEFAULT_TAB_MODEL = {
  editTab      : {
    active : true
  },
  previewTab   : {
    active         : false,
    tabVisible     : true,
    modelsVisible : true
  }
};

const initTabModel = (isPreviewPanelVisible, arePreviewModelsVisible) => {
  const _tabModel = angular.copy(DEFAULT_TAB_MODEL);
  angular.extend(_tabModel.previewTab, {
    tabVisible     : isPreviewPanelVisible,
    modelsVisible : arePreviewModelsVisible
  });
  return _tabModel;
};

const COLUMN_TEMPLATE =  {
  numColumn    : -1,
  exist        :true,
  control      : {
    type    :'none',
    key      : 'none',
    subtype  : 'none'
  }
};

const initColumnTemplate = () => angular.copy(COLUMN_TEMPLATE);

const LINE_TEMPLATE = {
  line:-1,
  activeColumn : 1,
  columns: [
    {
      numColumn: 1,
      exist:true,
      control: {
        type:'none',
        key: 'none'
        }
      }
    ]
};
const initLineTemplate = () => angular.copy(LINE_TEMPLATE);

export {
  initDebugModel,
  initTabModel,
  initColumnTemplate,
  initLineTemplate
};
