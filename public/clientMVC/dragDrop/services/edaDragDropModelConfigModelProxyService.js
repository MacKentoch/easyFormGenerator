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
			 * return a control model that is more formly detailed
			 * (more formly detailed : see controls property in EasyFormGenFormlyBindingModels._easyFormListControls)
			 */
			function getFormlyDetailedContorlModelFromDragDropObject(dragDrapCtrlModel){
				var controlModel = {};
				var listControl = EasyFormGenFormlyBindingModels.getEasyFormListControls();
				var controlsListGetter = $parse('controls');

				angular.forEach(controlsListGetter(listControl), function(ctrlListValue){
					if (ctrlListValue.id === dragDrapCtrlModel.control)  controlModel = ctrlListValue;
				});

				return controlModel;
			}



			/**
			 * bind formly detailed model to configuration control model
			 */
			function bindConfigCtrlModelFromFormlyDetailedCtrlModel(formlyDetailCtrlModel, configurationCtrlModel){
				

				/**
				 * TODO :properties should be served by provider 
				 *
				 * more configurable without pain
				 */


				//set selected control :
				$parse('control.selectedControl')
					.assign(configurationCtrlModel, $parse('selectedControl')(formlyDetailCtrlModel));

				//set type :	
				$parse('control.type')
					.assign(configurationCtrlModel, $parse('formlyType')(formlyDetailCtrlModel));

				//set type :	
				$parse('control.type')
					.assign(configurationCtrlModel, $parse('formlyType')(formlyDetailCtrlModel));

				//set subtype :	
				$parse('control.subtype')
					.assign(configurationCtrlModel, $parse('formlySubtype')(formlyDetailCtrlModel));

				//set templateOptions.label :	
				$parse('control.templateOptions.label')
					.assign(configurationCtrlModel, $parse('formlyLabel')(formlyDetailCtrlModel));					

				//set templateOptions.required :	
				$parse('control.templateOptions.required')
					.assign(configurationCtrlModel, $parse('formlyRequired')(formlyDetailCtrlModel));	

				//set templateOptions.required :	
				$parse('control.templateOptions.description')
					.assign(configurationCtrlModel, $parse('formlyDesciption')(formlyDetailCtrlModel));	

				//set templateOptions.required :	
				$parse('control.templateOptions.placeholder')
					.assign(configurationCtrlModel, $parse('formlyPlaceholder')(formlyDetailCtrlModel));

				//set templateOptions.required :	
				$parse('control.templateOptions.options')
					.assign(configurationCtrlModel, $parse('formlyOptions')(formlyDetailCtrlModel));


 				if ($parse('control.type')(configurationCtrlModel) === 'datepicker') {

					//$parse('control.templateOptions.datepicker')
					//	.assign(configurationCtrlModel, $parse('formlyOptions')(formlyDetailCtrlModel));

			  }
			      

			      // configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl 				= extractedProps.selectedControl;
			      // configurationObj.lines[indexLine].columns[numcolumn].control.type 										= extractedProps.formlyType;
			      // configurationObj.lines[indexLine].columns[numcolumn].control.subtype 								= extractedProps.formlySubtype;
			      // configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label 				= extractedProps.formlyLabel;
			      // configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required 		= extractedProps.formlyRequired;
			      // configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description 	= extractedProps.formlyDesciption;
			      // configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder 	= extractedProps.formlyPlaceholder;
			      // configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options 			= extractedProps.formlyOptions;
			     	

				console.dir({
					title 									: 'debug : bindConfigCtrlModelFromFormlyDetailedCtrlModel'	,
					formlyDetailCtrlModel 	: formlyDetailCtrlModel,
					configurationCtrlModel 	: configurationCtrlModel
				});			    

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
				 * iterates line config model
				 */
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
						// console.dir(	
						// 							{
						// 								'at line :' 					: keyValue,
						// 								'linevalue : ' 				: lineValue,
						// 								'Nb column in line'		: lineValue.length,
						// 								'colIndex'						: i,
						// 								'colValue : ' 				: lineValue[i],
						// 								'formlyDetailedModel' : getFormlyDetailedContorlModelFromDragDropObject(lineValue[i]),
						// 								'control config model': EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(lineValue.length, getFormlyDetailedContorlModelFromDragDropObject(lineValue[i]).formlyType)
						// 								//'configModelCtrl' : controllerModalProxy.
						// 							}
						// 						);
						 if (lineValue[i]) {
			    	/**
			    	 * push an emty control model but relative to dradrop ::model control type
			    	 * (if datepicker so additionnal properties are added)
			    	 */
			    	var columnsLength = configModel.lines[keyValue].columns.push(
			    			{
			    				control : EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(	lineValue.length, 
			    																																													getFormlyDetailedContorlModelFromDragDropObject(lineValue[i]).formlyType
			    																																												)
			    			}
			    	);

			    	bindConfigCtrlModelFromFormlyDetailedCtrlModel(getFormlyDetailedContorlModelFromDragDropObject(lineValue[i]), configModel.lines[keyValue].columns[columnsLength - 1]);



						 }
						//if(lineValue[i] !== '') configModel.lines[keyValue].columns.push(lineValue[i]);
					}
										

				});


				return true;
			};



			return Service;


	}]);

