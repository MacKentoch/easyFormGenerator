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
var dragDropItemDecorationService = angular.module('ngwfApp.services.dragDropItemDecorationService', []);
dragDropItemDecorationService.factory('dragDropItemDecorationService', 
																			[
																				'dragDropConfig',  
																				function(dragDropConfig){


	var _listItemClass = [].concat(dragDropConfig.getListItemCssClass());


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

	Service.getListClass = function(){
		return _listItemClass;
	};

  Service.getCssClassWhenNumberItemsInRowIs = function(thisNumber){
  	return getItemCssDependingNumberItemsInRow(thisNumber);
	}; 

	Service.applyCssClassWholeLine = function(model, indexColumn, indexLine, numberItems, restrictToThisIndexColumn){
	  if (typeof numberItems !== 'undefined' &&
	  	  typeof indexLine !== 'undefined' &&
	  	  typeof indexColumn !== 'undefined' &&
	  	  typeof model !== 'undefined' &&
	  	  typeof restrictToThisIndexColumn !== 'undefined') {

	    if (indexColumn === restrictToThisIndexColumn) {

        for (var i = model[indexColumn][indexLine].length - 1; i >= 0; i--) {
	          model[indexColumn][indexLine][i].cssClass = getItemCssDependingNumberItemsInRow(numberItems);

	          // console.info('debug service');
	          // console.dir({
	          // 							indexColumn : indexColumn,
	          // 							indexLine : indexLine,
	          // 							indexItem : i,
	          // 							cssClassApplied : getItemCssDependingNumberItemsInRow(numberItems)
	          // });
	      }

	    } 
	    return true;

	  }else{

	    return false;

	  }

	};


	Service.updateCssClassWholeColumn = function(model, indexColumn){
		return true;
	};





	return Service;

}]);