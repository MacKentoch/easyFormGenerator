/**
 *  ------------------------------------------------------
 *  service : ddItemRightClickedManager
 *  ------------------------------------------------------
 *
 *  service that helps managing right clicked controls 
 *  (right clicking control open side edit panel)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.services.ddItemRightClickedManager', [])
	.factory('ddItemRightClickedManager', [
		 
		function(){

			var Service = {};

			/**
			 * setUnRightClicked 
			 * set unSelected (see edaRightClick directive)
			 *
			 * used in edaEditcontroller when droping control
			 */
			Service.setUnRightClicked = function(dragDropModelItem){
				dragDropModelItem.rightCliked = false;
			};

			/**
			 * resetAllDragDropItemSelectedState
			 *
			 * simply reset (=set to false) all item.rightCliked 
			 * in edit column (dragable column)
			 *
			 * used in edaEditPanel when closeEditPanel() called
			 */
			Service.resetAllDragDropItemSelectedState = function(dragDropModel){
				/**
				 * iterates through lines
				 * NOTE : 
				 * - dragDropModel[1] since it is dragable column
				 * - dragDropModel[0] is just the "pick up controls" column
				 */
				angular.forEach(dragDropModel[1] ,function(line){
					angular.forEach(line, function(item){
						item.rightCliked = false;
					});
				});

			};

			return Service;
		}
	]);