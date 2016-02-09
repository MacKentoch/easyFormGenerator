/* global angular */

import easyFormDragWayConfig, {
	EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME
} 																		from './edaDragDropWay.edaDragdropWayEasyFormGen.provider';
import edaDragDropWayEasyFormGenCtrl, {
	DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER
}																			from './edaDragDropWay.edaDragdropWayEasyFormGen.controller';
import edaDragdropWayEasyFormGen, {
	EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE
}																			from './edaDragDropWay.edaDragdropWayEasyFormGen.directive';

																			
const DRAGDROP_MODULE = 'edaDragDropWay.main.module';

export default angular
								.module(DRAGDROP_MODULE, [])
								.provider(EASY_FORM_DRAG_DROP_WAY_CONFIG_NAME, easyFormDragWayConfig)
								.controller(DRAG_DROP_WAY_EASY_FORM_GEN_CONTROLLER, edaDragDropWayEasyFormGenCtrl)
								.directive(EDA_DRAGDROP_WAY_EASY_FORM_GEN_DIRECTIVE, edaDragdropWayEasyFormGen);