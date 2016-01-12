function dragDropConfigFunct(dragDropConfigProvider) {
  dragDropConfigProvider.setItemsNotTocount({
    //placeholder :         '',
    itemBeingDragged :    'dndDraggingSource'    
  });
}


dragDropConfigFunct.$inject = [
  'dragDropConfigProvider'
];

export default dragDropConfigFunct;

