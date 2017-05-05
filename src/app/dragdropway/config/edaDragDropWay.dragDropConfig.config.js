import easyFormConfig   from '../../../../package.json';

const EASY_FORM_DD_VERSION_NAME  = 'easyFormGenVersion';
const EASY_FORM_DD_VERSION_VALUE = easyFormConfig.version;

function dragDropConfigFunct(easyFormDragWayConfigProvider) {
  easyFormDragWayConfigProvider.setItemsNotTocount({
    //placeholder :         '',
    itemBeingDragged :    'dndDraggingSource'    
  });
}

dragDropConfigFunct.$inject = [
  'easyFormDragWayConfigProvider'
];

export default dragDropConfigFunct; 

export {
  EASY_FORM_DD_VERSION_NAME, 
  EASY_FORM_DD_VERSION_VALUE
};

