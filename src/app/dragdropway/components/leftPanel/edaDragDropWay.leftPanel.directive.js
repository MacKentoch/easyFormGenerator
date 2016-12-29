import {
	LEFT_PANEL_CONTROLLER,
	LEFT_PANEL_CONTROLLERAS
}																from './edaDragDropWay.leftPanel.controller';

import leftPanelTemplate from './edaDragDropWay.leftPanel.template.html';

const LEFT_PANEL_DIRECTIVE = 'leftPanel';


function leftPanel(){
	let directive = {
		restrict 					: 'E',
		template					: leftPanelTemplate,
		scope							: {},
		controller				:	LEFT_PANEL_CONTROLLER,
		controllerAs			: LEFT_PANEL_CONTROLLERAS,
		bindToController	: {
			closeEditPanel        : '&',
      selectedControl       : '&',
      saveFromEditPanel     : '&'
		}
	};
	return directive;
}

leftPanel.$inject = [];

export default leftPanel;

export {
	LEFT_PANEL_DIRECTIVE
};
