/* global angular */
import './edaDragDropWay.vendors.adapter';

import coreModule								from './core/edaDragDropWay.core.module';
import leftPanelModule 					from './components/leftPanel/edaDragDropWay.leftPanel.module';
import formlyProxyModule        from './components/formlyProxy/edaDragDropWay.formlyProxy.formFieldManage.module';
import dragdropModule						from './components/dragdrop/edaDragDropWay.dragdrop.module';
import rightClickModule					from './components/rightclick/edaDragDropWay.rightClick.module';
import configProxyModule        from './components/configurationModelProxy/edaDragDropWay.configurationModelProxy.module';
import easyFormDragDropModule 	from './components/edaDragDropWayEasyFormGen/edaDragDropWay.edaDragdropWayEasyFormGen.module';

const DRAG_DROP_WAY_MODULE_NAME 	= 'eda.easyformGen.dragDropWay';

const DRAG_DROP_MODULES_INJECT 		= [
	coreModule.name,
  configProxyModule.name,
	leftPanelModule.name,
  formlyProxyModule.name,
	dragdropModule.name,
	easyFormDragDropModule.name,
	rightClickModule.name 
];

let mainModule = angular
									.module(DRAG_DROP_WAY_MODULE_NAME, DRAG_DROP_MODULES_INJECT);
									
export default mainModule;