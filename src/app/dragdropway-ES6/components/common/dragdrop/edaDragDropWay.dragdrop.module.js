/* global angular */
import ddContentCounter, {
 DD_CONTENT_COUNTER_DIRECTIVE	
}															from './edaDragDropWay.dragdrop.ddContentCounter.directive';

const DRAGDROP_MODULE = 'edaDragDropWay.dragdrop.module';

export default angular
								.module(DRAGDROP_MODULE, [])
								.directive(DD_CONTENT_COUNTER_DIRECTIVE, ddContentCounter);