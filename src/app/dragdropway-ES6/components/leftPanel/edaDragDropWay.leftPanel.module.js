/* global angular */
import leftPanelController, {
	LEFT_PANEL_CONTROLLER
}														from './edaDragDropWay.leftPanel.controller';


const LEFT_PANEL_MODULE = 'edaDragDropWay.leftPanel.module';


export default angular
								.module(LEFT_PANEL_MODULE, [])
								.controller(LEFT_PANEL_CONTROLLER, leftPanelController);