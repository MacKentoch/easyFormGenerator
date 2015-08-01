/**
 *  ------------------------------------------------------
 *  service : dragDropItemDecorationService
 *  ------------------------------------------------------
 *
 *  service that helps manipulating drag drop item class
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.services.dragDropItemCountersService', [])
	.factory('dragDropItemCounterService', ['dragDropConfig', 
	
	function(dragDropConfig){

		var _modelItemRealCounter = [];
		var _itemsNotToCount = angular.copy(dragDropConfig.getItemsNotToCount());

		var Service = {};
		
		Service.getItemsNotToCount = function(){
																	return _itemsNotToCount;
																	}; 

		Service.getModelItemsRealCounter = function(){
																		  	return _modelItemRealCounter;
																				};

		Service.isHtmlElementToCount = function(htmlvalue){
																			var isToCount = true;
																			if (htmlvalue.length > 0) {

																				angular.forEach(_itemsNotToCount, function(value){

																					for (var classes = htmlvalue.length - 1; classes >= 0; classes--) {
																						if (htmlvalue[classes] === value){
																							isToCount = isToCount & false;
																						}
																					}

																				});
																			}
																			
																			return isToCount;	
																		};																	
		Service.updateLineItemCss = function(fullModel, listCssToApply, columIndex, lineIndex, realCount){
																	  if (typeof fullModel 			!== 		'undefined' &&
																	  	  typeof listCssToApply !== 		'undefined' &&
																	  	  typeof columIndex 		!== 		'undefined' &&
																	  	  typeof lineIndex 			!== 		'undefined' &&
																	  	  typeof realCount 			!== 		'undefined') {

																					for (var i = fullModel[columIndex][lineIndex].length - 1; i >= 0; i--) {
																						
																						for (var j = 0; j < listCssToApply.length; j++) {
																							if(listCssToApply[j].item === i &&
																								 listCssToApply[j].isReal === true){

																								fullModel[columIndex][lineIndex][i].cssClass = dragDropConfig.getItemCssDependingNumberItemsInRow(realCount);
																							} 	
																						}

																					}																					
																					return true;
																				}
																			};
		
		return Service;

}]);