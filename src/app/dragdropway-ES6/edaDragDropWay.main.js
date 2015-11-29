/* global angular */
import './edaDragDropWay.vendors.adapter';
import coreModule				from './core/edaDragDropWay.core.module';
import leftPanelModule 	from './components/common/leftPanel/edaDragDropWay.leftPanel.module';
import dragdropModule		from './components/common/dragdrop/edaDragDropWay.dragdrop.module';
import rightClickModule	from './components/common/rightclick/edaDragDropWay.rightClick.module';

const DRAG_DROP_WAY_MODULE_NAME 	= 'eda.easyformGen.dragDropWay';

const DRAG_DROP_MODULES_INJECT 		= [
	coreModule.name,
	leftPanelModule.name,
	dragdropModule.name,
	rightClickModule.name 
];

let mainModule = angular
									.module(DRAG_DROP_WAY_MODULE_NAME, DRAG_DROP_MODULES_INJECT);
									
export default mainModule;