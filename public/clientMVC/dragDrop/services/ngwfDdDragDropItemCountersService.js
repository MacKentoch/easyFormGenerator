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
																			var isHtmlToCount = true;
																			angular.forEach(_itemsNotToCount, function(value){
																				console.info('htmlvalue = '+ htmlvalue);

																				isHtmlToCount = htmlvalue.indexOf(value) > -1 ? false : true;
																			});
																			console.info('isHtmlTocout in dragDropItemCounterService : ' + isHtmlToCount);
																			return isHtmlToCount;	
																		};
		Service.updateModelItemRealCounter = function(columIndex, lineIndex, countValue){
																					//todo : update _modelItemRealCounter
																					//
																					return true;
																				};

		return Service;

}]);