/* global angular */
import './edaDragDropWay.vendors.adapter';
import coreModule				from './core/edaDragDropWay.core.module';
import leftPanelModule 	from './components/common/leftPanel/edaDragDropWay.leftPanel.module';


const DRAG_DROP_WAY_MODULE_NAME 	= 'eda.easyformGen.dragDropWay';

const DRAG_DROP_MODULES_INJECT 		= [
	coreModule.name,
	leftPanelModule.name 
];

let mainModule = angular
									.module(DRAG_DROP_WAY_MODULE_NAME, DRAG_DROP_MODULES_INJECT);
									
export default mainModule;