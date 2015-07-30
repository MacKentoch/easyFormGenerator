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
					console.dir(
						{
							'title : ': 'from refreshAllConfigurationFromDragAndDropModel',
							'configModel' : configModel,
							'ddModel': ddModel	
						}	);
				
				angular.forEach(ddModel[1], function(lineValue, keyValue){
					console.info(	[
													'lineValue : ',
													lineValue,
													'\nkeyValue : ',
													keyValue
												].join(''));

					console.info('value details : ');
					console.dir(lineValue);
					/**
					 * add empty line 1st
					 */
					configModel.lines.push(EasyFormGenFormlyBindingModels.getEasyFormEmptyConfigurationLineModel());
					/**
					 * add controls to this lien from drag and drop model ("ddModel")
					 */
					
					
					if(lineValue !== '') configModel.lines[keyValue].controls = [].concat(lineValue);

					/**
					 * for dev only :to comment or delete 
					 */
					// console.dir(
					// 	{
					// 		'shouldPushThis' : ddModel[1][keyValue],
					// 		'configuratioModelBeforePush': configModel.lines	
					// 	}	
					//);

				});


				return true;
			};



			return Service;


	}]);

