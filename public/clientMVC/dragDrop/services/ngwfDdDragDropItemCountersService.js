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
	.module('ngwfApp.services.dragDropItemCountersService', [])
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

		// Service.applyCssClassWholeLine = function(model, indexColumn, indexLine, numberItems, restrictToThisIndexColumn){
		//   if (typeof numberItems !== 'undefined' &&
		//   	  typeof indexLine !== 'undefined' &&
		//   	  typeof indexColumn !== 'undefined' &&
		//   	  typeof model !== 'undefined' &&
		//   	  typeof restrictToThisIndexColumn !== 'undefined') {

		//     if (indexColumn === restrictToThisIndexColumn) {

	 //        for (var i = model[indexColumn][indexLine].length - 1; i >= 0; i--) {
		//           model[indexColumn][indexLine][i].cssClass = getItemCssDependingNumberItemsInRow(numberItems);
		//       }

		//     } 
		//     return true;
		//   }else{
		//     return false;
		//   }
		// };			
																	
		Service.updateLineItemCss = function(fullModel, listCssToApply,columIndex, lineIndex, countValue){
																					//todo : update _modelItemRealCounter
																					//
																					return true;
																				};

		return Service;

}]);