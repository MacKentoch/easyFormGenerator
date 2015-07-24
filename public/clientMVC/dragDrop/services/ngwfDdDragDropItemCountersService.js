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

		var _listItemClass = [].concat(dragDropConfig.getListItemCssClass());
		var _modelItemRealCounter = [];
		var _itemsNotToCount = angular.copy(dragDropConfig.getItemsNotToCount());

		var Service = {};


		function getItemCssDependingNumberItemsInRow(numberOfItems){
		  if(typeof numberOfItems !== 'undefined'){
		    var classToReturn = '';
		    for (var i = _listItemClass.length - 1; i >= 0; i--) {
		      if (_listItemClass[i].numberItemPerRow === numberOfItems) {
		        classToReturn = _listItemClass[i].cssClass;  
		      }
		    }
		    return classToReturn;
		  }else{
		    return '';
		  } 		
		} 


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
																	
		Service.updateLineItemCss = function(fullModel, listCssToApply, columIndex, lineIndex, realCount){

																					console.dir(fullModel);
																					//listCssToApply : {item: i, isReal : true}
																					for (var i = fullModel[columIndex][lineIndex].length - 1; i >= 0; i--) {
																						
																						for (var j = 0; j < listCssToApply.length; j++) {
																							if(listCssToApply[j].item === i &&
																								 listCssToApply[j].isReal === true){

																								fullModel[columIndex][lineIndex][i].cssClass = getItemCssDependingNumberItemsInRow(realCount);

																																								
																							}else{
																								fullModel[columIndex][lineIndex][i].cssClass = '';
																							} 	
																						}

																					}

																					console.dir({
																													here :'updateLineItemCss',
																													line : fullModel[columIndex][lineIndex]
																												});
																					
																					return true;
																				};

		return Service;

}]);