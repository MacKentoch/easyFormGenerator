import easyFormConfig   from '../../easyFormConfig.json';

const EASY_FORM_DD_VERSION_NAME  = 'easyFormGenVersion';
let   EASY_FORM_DD_VERSION_VALUE = easyFormConfig.dragdropway.version;

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

