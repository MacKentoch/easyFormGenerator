/**
 *  ------------------------------------------------------
 *  module = "services" container
 *  ------------------------------------------------------
 *
 * contains all app services
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

;(function () {
	'use strict';

	angular.module(
									'ngwfApp.services', [	
																				'ngwfApp.services.formFieldManage',
																				'ngwfApp.services.selectOptionManage',
																				'ngwfApp.services.ngwfEditCtrlControllerModalProxy'
																			]
								);

})(); 

