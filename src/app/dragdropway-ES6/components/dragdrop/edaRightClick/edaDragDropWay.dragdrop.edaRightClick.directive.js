const EDA_RIGHT_CLICK_DIRECTIVE = 'edaRightClick';

function edaRightClick($parse){
	let directive = {
		restrict	: 'A',
		link			: linkfct
	};
	return directive;
	
	function linkfct(scope, element, attrs){
		let fn                  = $parse(attrs.edaRightClick);
		let columnIndex         = $parse(attrs.edaRightClickColIndex);
		let fctSetRightclicked  = $parse(attrs.edaSetRightClicked);
		/**
			* on right click event manage
			* - open edit panel through attrs.edaRightClick function
			* - set rightCliked attribute (to true) to control (in dragDropModel)
			*/
		element.on('contextmenu', (event)=>{
			scope.$apply(()=>{
				event.preventDefault();
				//right click limited to template column (index = 1)									                           
				if (columnIndex(scope) === 1) {
					fctSetRightclicked(scope, {}); //set rightClicked to true
					fn(scope, {$event:event}); 
				}		
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