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

					console.info('line value details : ');
					console.dir(lineValue);
					
					/**
					 * add empty line 1st 
					 * if line is empty -> it will be enough
					 */
					configModel.lines.push(EasyFormGenFormlyBindingModels.getEasyFormEmptyConfigurationLineModel());
					
					/**
					 * iterate through columns
					 * and add them if control exists
					 */
					
					angular.forEach(lineValue , function(colValue, colKeyValue){
						console.info(	[
								'colValue : ',
								colKeyValue,
								'\nkeyValue : ',
								keyValue
							].join(''));

						console.info('col value details : ');
						console.dir(colValue);
						
						/**
					 	* add controls to this line/col from drag and drop model ("ddModel")
					 	*/
						//if(colValue !== '') configModel.lines[keyValue].columns[colKeyValue].control = [].concat(colKeyValue);
					});




					

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

