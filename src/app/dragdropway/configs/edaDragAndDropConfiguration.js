/**
 *  ------------------------------------------------------
 *  configuration edaDragAndDropConfig
 *  ------------------------------------------------------
 *
 * configuration related to drag and drop
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp')
	.config(['dragDropConfigProvider',
	
	function (dragDropConfigProvider) {

    dragDropConfigProvider.setItemsNotTocount({
                                                //placeholder :         '',
                                                itemBeingDragged :    'dndDraggingSource'    
                                              });
 
	}]);

