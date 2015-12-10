/* global angular */
import leftPanelController, {
	LEFT_PANEL_CONTROLLER
}														from './edaDragDropWay.leftPanel.controller';
import leftPanel, {
	LEFT_PANEL_DIRECTIVE
}														from './edaDragDropWay.leftPanel.directive';

const LEFT_PANEL_MODULE = 'edaDragDropWay.leftPanel.module';


export default angular
								.module(LEFT_PANEL_MODULE, [])
								.directive(LEFT_PANEL_DIRECTIVE, leftPanel)
								.controller(LEFT_PANEL_CONTROLLER, leftPanelController);