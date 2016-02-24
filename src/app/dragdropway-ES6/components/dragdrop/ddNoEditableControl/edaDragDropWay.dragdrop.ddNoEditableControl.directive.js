const DRAG_DROP_NO_EDITABLE_CONTROL = 'ddNoEditableControl';

function ddNoEditableControl() {
	let directive = {
		restrict	: 'A',
		link			: linkfct
	};
	return directive;

	function linkfct($scope, element) {
		element.on('click', (event)=>event.preventDefault());
	}
}

ddNoEditableControl.$inject = [];

export default ddNoEditableControl;

export {
	DRAG_DROP_NO_EDITABLE_CONTROL
};
