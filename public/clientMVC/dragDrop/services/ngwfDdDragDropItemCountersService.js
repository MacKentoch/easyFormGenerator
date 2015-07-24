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

		//var _listItemClass = [].concat(dragDropConfig.getListItemCssClass());
		var _modelItemRealCounter = [];
		var _itemsNotToCount = angular.copy(dragDropConfig.getItemsNotToCount());
		var _listClassMustHave = [
															'col-md-12',
															'col-md-6',
															'col-md-4',
															'dndPlaceholder'
														];														

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

																				 var hasMustHaveClass = false;
																				// angular.forEach(_listClassMustHave, function(valueMustHave){
																				// 	for (var classes = htmlvalue.length - 1; classes >= 0; classes--) {
																				// 		if (htmlvalue[classes] === valueMustHave){
																				// 			hasMustHaveClass = hasMustHaveClass | true;
																				// 		}
																				// 	}

																				// });																				

																				// isToCount = isToCount & hasMustHaveClass;

																				console.info(
																											[
																												
																												'isHtmlElementToCount',
																												'-htmlvalue-',
																												htmlvalue,
																												'isToCount',
																												isToCount,
																												'hasMustHaveClass',
																												hasMustHaveClass
																											].join(' ')
																										);
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

																								console.warn([
																																'-from updateLineItemCss-',
																																'css apply :',
																																fullModel[columIndex][lineIndex][i].cssClass,
																																'to columIndex: ',
																																columIndex,
																																'and lineIndex',
																																lineIndex,
																																'itemIndex',
																																i
																															].join(' ')
																															);

																							} 	
																						}

																					}
																					// console.info(
																					// 							[
																													
																					// 								'updateLineItemCss',
																					// 								'at column',
																					// 								columIndex,
																					// 								'at line',
																					// 								lineIndex,
																					// 								'real item count',
																					// 								realCount
																					// 							].join(' ')
																					// 						);

																					// console.dir({
																					// 								here :'updateLineItemCss',
																					// 								realCount : realCount,
																					// 								line : fullModel[columIndex][lineIndex]

																					// 						});
																					
																					return true;
																				}
																			};

		return Service;

}]);