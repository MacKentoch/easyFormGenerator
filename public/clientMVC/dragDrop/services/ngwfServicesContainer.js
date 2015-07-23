/**
 *  ------------------------------------------------------
 *  module = "services" container
 *  ------------------------------------------------------
 *      Syntax (convention) :
 *          "ngwfApp" = application
 *          "ngwfApp.services" = container services module
 *
 *  This module is a container -> it must be injected in the application -> so it will inject all services injected here
 *
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

angular.module('ngwfApp.services', 
							[	
								'ngwfApp.services.formFieldManage',
								'ngwfApp.services.selectOptionManage',
								'ngwfApp.services.ngwfWfFormsServices',
								'ngwfApp.services.ngwfEditCtrlControllerModalProxy',
								'ngwfApp.services.dragDropItemDecorationService',
								'ngwfApp.services.dragDropItemCountersService',
								function () {
}]);