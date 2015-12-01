/* global angular */
import ddContentCounter, {
 DD_CONTENT_COUNTER_DIRECTIVE	
}																			from './edaDragDropWay.dragdrop.ddContentCounter.directive';
import ddDecorContainerDirective, {
	DD_DECOR_CONTAINER_DIRECTIVE
} 																		from './ddDecorContainer/edaDragDropWay.dragdrop.ddDecorContainer.directive';
import ddDecorContainerController, {
	DD_DECOR_CONTAINER_CONTROLLER_NAME
} 																		from './ddDecorContainer/edaDragDropWay.dragdrop.ddDecorContainer.controller';
import ddDecorDropZone, {
	DD_DECOR_DROPZONE_DIRECTIVE
} 																		from './/ddDecorDropZone/edaDragDropWay.dragdrop.ddDecorDropZone.directive';

const DRAGDROP_MODULE = 'edaDragDropWay.dragdrop.module';


export default angular
								.module(DRAGDROP_MODULE, [])
								.directive(DD_CONTENT_COUNTER_DIRECTIVE, ddContentCounter)
								.controller(DD_DECOR_CONTAINER_CONTROLLER_NAME, ddDecorContainerController)
								.directive(DD_DECOR_CONTAINER_DIRECTIVE, ddDecorContainerDirective)
								.directive(DD_DECOR_DROPZONE_DIRECTIVE, ddDecorDropZone);