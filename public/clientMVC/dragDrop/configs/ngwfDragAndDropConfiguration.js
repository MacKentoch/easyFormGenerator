/**
 *  ------------------------------------------------------
 *  configuration ngwfDragAndDropConfig
 *  ------------------------------------------------------
 *
 * 
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('ngwfApp.configs.ngwfDragAndDropConfig', [])
	.config(['dragDropConfigProvider',

	function (dragDropConfigProvider) {

    dragDropConfigProvider.setItemsNotTocount({
                                                //placeholder :         '',
                                                itemBeingDragged :    'dndDraggingSource'    
                                              });
 
	}]);

