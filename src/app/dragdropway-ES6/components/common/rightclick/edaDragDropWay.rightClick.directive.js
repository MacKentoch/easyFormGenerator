const EDA_RIGHT_CLICK_DIRECTIVE = 'edaRightClick';

function edaRightClick($parse){
  
	let directive = {
    restrict  : 'A',
    link      : linkFct
  };
  return directive;
  
  function linkFct(scope, element, attrs){
    let fn                  = $parse(attrs.edaRightClick);
    let columnIndex         = $parse(attrs.edaRightClickColIndex);
    let fctSetRightclicked  = $parse(attrs.edaSetRightClicked);      
    /**
      * on right click event manage
      * - open edit panel through attrs.edaRightClick function
      * - set rightCliked attribute (to true) to control (in dragDropModel)
      */
    element.on('contextmenu', (event)=>{
      scope.$apply(() =>{
        event.preventDefault();
        if (columnIndex(scope) === 1) fctSetRightclicked(scope, {}); //right click limited to template column (index = 1)
        if (columnIndex(scope) === 1) fn(scope, {$event:event}); //right click limited to template column (index = 1)
      });
    });	

  }
  
}

edaRightClick.$inject = [
  '$parse'
];

export default edaRightClick;


export {
  EDA_RIGHT_CLICK_DIRECTIVE
};
