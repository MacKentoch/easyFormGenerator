///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "directives" container
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.directives" = container directives module
//
//  This module is a container -> it must be injected in the application -> so it will inject all directives injected here
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular.module('ngwfApp.directives', [	'ngwfApp.directives.ngwfStRationDirective',
																				'ngwfApp.directives.ngwfDdDecorContainerDirective',
										function () {
    //verbose
    //console.log('--> INIT : Hello directives container  \'\'ngwfApp.directives\'\' ');
}]);

