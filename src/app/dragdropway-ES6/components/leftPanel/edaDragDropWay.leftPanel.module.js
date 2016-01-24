/* global angular */
import leftPanelController, {
	LEFT_PANEL_CONTROLLER
}														from './edaDragDropWay.leftPanel.controller';
import leftPanel, {
	LEFT_PANEL_DIRECTIVE
}														from './edaDragDropWay.leftPanel.directive';
import selectOptionMange, {
  LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE
}                           from './edaDragDropWay.leftPanel.selectOptionManage.service';
import controllerModalProxy, {
  CONTROLLER_MODAL_PROXY
}                           from './edaDragDropWay.leftPanel.controllerModalProxy.service';

const LEFT_PANEL_MODULE = 'edaDragDropWay.leftPanel.module';


export default angular
								.module(LEFT_PANEL_MODULE, [])
								.directive(LEFT_PANEL_DIRECTIVE, leftPanel)
								.controller(LEFT_PANEL_CONTROLLER, leftPanelController)
                .service(LEFT_PANEL_SELECT_OPTION_MANAGE_SERVICE, selectOptionMange)
                .service(CONTROLLER_MODAL_PROXY, controllerModalProxy);