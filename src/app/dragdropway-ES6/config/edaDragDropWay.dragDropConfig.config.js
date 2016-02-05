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

