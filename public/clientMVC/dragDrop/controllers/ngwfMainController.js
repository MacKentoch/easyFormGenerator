///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// module = "controllers"  for view "ngwfMainController"
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.controllers.ngwfMainController" = controller module
//
//  This module is a view controller -> it must be injected in controller container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
angular
	.module('ngwfApp.controllers.ngwfMainController', [])
	.controller('ngwfMainController', ['$scope', 'EasyFormGenFormlyBindingModels',
		function ($scope, EasyFormGenFormlyBindingModels) {
			
			/**
			 * debug test
			 */
			
			//var hreserRaw = EasyFormGenFormlyBindingModels.getRawHeaderTemplates();

			var headerTemple2col = EasyFormGenFormlyBindingModels.getHeaderTemplateForNcolumnLine(2, 'text for my header');

			var controlRaw = EasyFormGenFormlyBindingModels.getRawFormlyControlTemplates();

			var controlTempale2ColDatepicker = EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(2, 'datepicker');

			console.info('debug EasyFormGenFormlyBindingModels header and controls template');
			console.dir(
									{
										//hreserRaw : hreserRaw,
										headerTemple2col : headerTemple2col,
										controlRaw: controlRaw,
										controlTempale2ColDatepicker : controlTempale2ColDatepicker	
									}
								);
			console.info('');

		}]);