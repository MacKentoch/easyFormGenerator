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
		'', 
		function(){

			var Service = {};

			/**
			 * setUnRightClicked 
			 * @param {[type]} dragDropModelItem [description]
			 */
			Service.setUnRightClicked = function(dragDropModelItem){

			};

			Service.resetAllDragDropItemSelectedState = function(){

			};

			return Service;
		}
	]);