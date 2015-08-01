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
	.module('edaApp.services.dragDropModelConfigModelProxyService', [])
	.factory('ddModelConfModelProxyService', [	'EasyFormGenFormlyBindingModels',
																							'controllerModalProxy',
																							'$parse',
		function( EasyFormGenFormlyBindingModels, controllerModalProxy, $parse){


			/**
			 * return a control model 
			 * (more formly detailed : see controls property in EasyFormGenFormlyBindingModels._easyFormListControls)
			 */
			function getFormlyDetailedContorlModelFromDragDropObject(dragDrapCtrlModel){
				var controlModel = {};
				var listControl = EasyFormGenFormlyBindingModels.getEasyFormListControls();
				var controlsListGetter = $parse('controls');

				angular.forEach(controlsListGetter(listControl), function(ctrlListValue, ctrlListId){
					if (ctrlListValue.id === dragDrapCtrlModel.control)  controlModel = ctrlListValue;
				});

				return controlModel;
			}

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
					/**
					 * add empty line 1st 
					 * if line is empty -> it will be enough
					 */
					configModel.lines.push(EasyFormGenFormlyBindingModels.getEasyFormEmptyConfigurationLineModel());
					
					/**
					 * iterate through columns
					 * and add them if control exists
					 */
					for (var i = lineValue.length - 1; i >= 0; i--) {

						console.dir(	
													{
														'at line :' 		: keyValue,
														'linevalue : ' 	: lineValue,
														'colIndex'			: i,
														'colValue : ' 	: lineValue[i],
														'formlyDetailedModel' : getFormlyDetailedContorlModelFromDragDropObject(lineValue[i])
													}
												);
						
						/**
						 * EasyFormGenFormlyBindingModels._easyFormListControls gives detailed control
						 * that can be bound to configuration model like done by 
						 * 
						 * controllerModalProxy.bindConfigurationModelFromModalReturn
						 */


						if(lineValue[i] !== '') configModel.lines[keyValue].columns.push(lineValue[i]);
					}
										

				});


				return true;
			};



			return Service;


	}]);

