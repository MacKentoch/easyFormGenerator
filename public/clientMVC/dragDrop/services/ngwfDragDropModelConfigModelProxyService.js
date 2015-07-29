/**
 *  ------------------------------------------------------
 *  service : dragDropModelConfigModelProxyService
 *  ------------------------------------------------------
 *
 *  service that helps to bind drag drop model to configuration model
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/

angular
	.module('ngwfApp.services.dragDropModelConfigModelProxyService', [])
	.factory('ddModelConfModelProxyService', [	'EasyFormGenFormlyBindingModels',
		function( EasyFormGenFormlyBindingModels ){



			var Service = {};

			/**
			 * refreshAllConfigurationFromDragAndDropModel 
			 * @param 	configModel [description]
			 * @param 	ddModel     [description]
			 */
			Service.refreshAllConfigurationFromDragAndDropModel = function(configModel, ddModel){
				configModel.lines = [];
				/**
				 * iterates line config model                                                                                                             [description]
				 */
				angular.forEach(ddModel.lines, function(lineValue, keyValue){
					/**
					 * add empty line 1st
					 */
					configModel.lines.push(EasyFormGenFormlyBindingModels.getEasyFormEmptyConfigurationLineModel());
					/**
					 * add controls to this lien from drag and drop model ("ddModel")
					 */
					configModel.lines[keyValue].controls.push(ddModel[1][keyValue]);

				});


				return true;
			};



			return Service;


	}]);

