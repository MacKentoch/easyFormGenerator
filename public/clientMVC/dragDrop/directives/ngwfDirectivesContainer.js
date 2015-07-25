/**
 *  ------------------------------------------------------
 *  directives container
 *  ------------------------------------------------------
 *
 *      Syntax (convention) :
 *          "ngwfApp" = application
 *          "ngwfApp.directives" = container directives module
 *
 *  This module is a container -> it must be injected in the application -> so it will inject all directives injected here
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('ngwfApp.directives', [	'ngwfApp.directives.ngwfStRationDirective',
																				'ngwfApp.directives.ngwfDdDecorDropZoneDirective',
																				'ngwfApp.directives.ngwfDdDecorContainerDirective',
																				'ngwfApp.directives.ngwfDdDecorLineDirective',
																				'ngwfApp.directives.ngwfDdDecorItemDirective',
																				'ngwfApp.directives.ngwfDdNoEditableControlDirective',
																				'ngwfApp.directives.ngwfDdContentCounterDirective',
	function () {

}]);

