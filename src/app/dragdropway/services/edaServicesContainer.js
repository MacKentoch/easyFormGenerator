/**
 *  ------------------------------------------------------
 *  module = "services" container
 *  ------------------------------------------------------
 *      Syntax (convention) :
 *          "edaApp" = application
 *          "edaApp.services" = container services module
 *
 *  This module is a container -> it must be injected in the application -> so it will inject all services injected here
 *
 *
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

angular.module('edaApp.services', 
							[	
								'edaApp.services.formFieldManage',
								'edaApp.services.selectOptionManage',
								//'edaApp.services.formsByIdService',
								'edaApp.services.edaEditCtrlControllerModalProxy',
								'edaApp.services.dragDropItemDecorationService',
								'edaApp.services.dragDropItemCountersService',
								'edaApp.services.dragDropModelConfigModelProxyService',
								'edaApp.services.ddItemRightClickedManager',
				]);