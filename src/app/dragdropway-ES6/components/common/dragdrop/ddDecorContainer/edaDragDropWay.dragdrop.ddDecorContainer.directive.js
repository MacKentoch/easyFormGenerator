import ddDecorContainerTemplate 			from './edaDragDropWay.dragdrop.ddDecorContainer.template!text';
import ddDecorContainerController, {
	DD_DECOR_CONTAINER_CONTROLLER_NAME,
	DD_DECOR_CONTAINER_CONTROLLERAS_NAME
}																			from './edaDragDropWay.dragdrop.ddDecorContainer.controller';


const DD_DECOR_CONTAINER_DIRECTIVE = 'ddDecorContainer';


function ddDecorContainer(){
	let directive = {
		restrict					: 'A',
		template					: ddDecorContainerTemplate,
		scope 						: {},
		controller				: DD_DECOR_CONTAINER_CONTROLLER_NAME,
    controllerAs			: DD_DECOR_CONTAINER_CONTROLLERAS_NAME,
    bindToController	: {
			'styleParam'           : '=ddContainerProperties',
			'isStillCollapsed'     : '=ddContainerIsCollpased',
			'verboseMode'          : '@ddContainerVerboseMode',
			'currentIndex'         : '@ddContainerCurrentIndex',
			'collpaseAll'          : '&ddCollapseAll'
    },
		transclude				: true,
		link 							:	linkFct		 
	};
	return directive;
	
	function linkFct($scope, element, attrs, ctrl, transclude){
		//TODO : to finish migration - take care NEW : bindToController and controllerAs syntax
	}
	
}


export default ddDecorContainer;

export {
	DD_DECOR_CONTAINER_DIRECTIVE
};
