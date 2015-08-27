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
	.module('edaApp.services.dragDropItemDecorationService', [])
	.factory('dragDropItemDecorationService', 
																			['dragDropConfig',  
	
	function(dragDropConfig){

		var _listItemClass = [].concat(dragDropConfig.getListItemCssClass());

		var Service = {};

		Service.getListClass = function(){
														return _listItemClass;
														};

	  Service.getCssClassWhenNumberItemsInRowIs = function(thisNumber){
	  																						return dragDropConfig.getItemCssDependingNumberItemsInRow(thisNumber);
																								}; 

		Service.applyCssClassWholeLine = function(model, indexColumn, indexLine, numberItems, restrictToThisIndexColumn){
		  if (typeof numberItems !== 'undefined' &&
		  	  typeof indexLine !== 'undefined' &&
		  	  typeof indexColumn !== 'undefined' &&
		  	  typeof model !== 'undefined' &&
		  	  typeof restrictToThisIndexColumn !== 'undefined') {

		    if (indexColumn === restrictToThisIndexColumn) {

	        for (var i = model[indexColumn][indexLine].length - 1; i >= 0; i--) {
		          model[indexColumn][indexLine][i].cssClass = dragDropConfig.getItemCssDependingNumberItemsInRow(numberItems);
		      }

		    } 
		    return true;
		  }else{
		    return false;
		  }
		};

		Service.updateCssClassWholeColumn = function(model, indexColumn){

		  if (typeof indexColumn !== 'undefined' &&
		  	  typeof model !== 'undefined') {

		   	/**
		   	 * iterates through rows
		   	 */
		   	for (var cpt = model[indexColumn].length - 1; cpt >= 0; cpt--) {
			   	/**
			   	 * iterates through items
			   	 */
		      for (var i = model[indexColumn][cpt].length - 1; i >= 0; i--) {
		          model[indexColumn][cpt][i].cssClass = dragDropConfig.getItemCssDependingNumberItemsInRow(model[indexColumn][cpt].length);
		      }
		   	}	

		    return true;
			}else{
				return false;
			}
		};

		return Service;

}]);