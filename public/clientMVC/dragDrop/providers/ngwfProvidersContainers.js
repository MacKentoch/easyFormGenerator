/**
 *  ------------------------------------------------------
 *  module = "providers" container
 *  ------------------------------------------------------
 *      Syntax (convention) :
 *          "ngwfApp" = application
 *          "ngwfApp.providers" = container services module
 *
 *  This module is a container -> it must be injected in the application -> so it will inject all services injected here
 *
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

angular.module('ngwfApp.providers', [
																			'ngwfApp.providers.dragDropConfigProvider'
																		], 
																		function () {

});
