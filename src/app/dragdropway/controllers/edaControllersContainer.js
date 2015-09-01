/**
 *  ------------------------------------------------------
 *  module = "controllers" container
 *  ------------------------------------------------------
 *
 *  This module is a container -> it must be injected in the application -> so it will inject all controllers injected here
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.controllers', [	'edaApp.controllers.edaMainController',
																	'edaApp.controllers.edaEditController',
																	'edaApp.controllers.edaEditMODALController',
																	'edaApp.controllers.edaEditPanelController',							
	]);
