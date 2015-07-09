///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "controllers" container
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.controllers" = container controller module
//
//  This module is a container -> it must be injected in the application -> so it will inject all controllers injected here
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular.module('ngwfApp.controllers', [	'ngwfApp.controllers.ngwfMainController',
										'ngwfApp.controllers.ngwfWfEditController',
										'ngwfApp.controllers.ngwfWfEditMODALController',
										'ngwfApp.controllers.yourController',							
										function () {
    //verbose
    //console.log('--> INIT : Hello controllers container  \'\'ngwfApp.controllers\'\' ');
}]);
