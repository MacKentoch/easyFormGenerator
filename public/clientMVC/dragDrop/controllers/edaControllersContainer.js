///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "controllers" container
//  ------------------------------------------------------
//      Syntax (convention) :
//          "edaApp" = application
//          "edaApp.controllers" = container controller module
//
//  This module is a container -> it must be injected in the application -> so it will inject all controllers injected here
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular.module('edaApp.controllers', [	'edaApp.controllers.edaMainController',
																				'edaApp.controllers.edaEditController',
																				'edaApp.controllers.edaEditMODALController',							
			function () {
}]);
