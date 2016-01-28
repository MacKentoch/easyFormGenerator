import './edaDragDropWay.vendors.adapter';

import formlyConfigFunct        from './config/edaDragDropWay.formlyConfig.config';
import dragDropConfigFunt       from './config/edaDragDropWay.dragDropConfig.config';

import coreModule								from './core/edaDragDropWay.core.module';
import leftPanelModule 					from './components/leftPanel/edaDragDropWay.leftPanel.module';
import formlyProxyModule        from './components/formlyProxy/edaDragDropWay.formlyProxy.formFieldManage.module';
import dragdropModule						from './components/dragdrop/edaDragDropWay.dragdrop.module';
import rightClickModule					from './components/common/rightclick/edaDragDropWay.rightClick.module';
import configProxyModule        from './components/configurationModelProxy/edaDragDropWay.configurationModelProxy.module';

import easyFormDragDropModule 	from './components/edaDragDropWayEasyFormGen/edaDragDropWay.edaDragdropWayEasyFormGen.module';
import trustThisFilterModule    from './components/common/edaTrustThisFilter/edaDragDropWay.trustThis.module';

const DRAG_DROP_WAY_MODULE_NAME 	= 'eda.easyformGen.dragDropWay';

const DRAG_DROP_MODULES_INJECT 		= [
	coreModule.name,
  configProxyModule.name,
  trustThisFilterModule.name,
	leftPanelModule.name,
  formlyProxyModule.name,
	dragdropModule.name,
	easyFormDragDropModule.name,
	rightClickModule.name 
];

let mainModule = angular
									.module(DRAG_DROP_WAY_MODULE_NAME, DRAG_DROP_MODULES_INJECT)
                  .config(dragDropConfigFunt)
                  .config(formlyConfigFunct);
									
export default mainModule;