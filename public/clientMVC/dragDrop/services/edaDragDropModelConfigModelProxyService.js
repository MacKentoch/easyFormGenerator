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
			function returnConfigCtrlModelFromFormlyDetailedCtrlModel(formlyDetailCtrlModel, configurationCtrlModel){
				      
	     

	      // var extractedProps = returnControlFromAddCtrlModalModel(modalAddCtrlModel);

	      // configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl 	= extractedProps.selectedControl;
	      // configurationObj.lines[indexLine].columns[numcolumn].control.type 						= extractedProps.formlyType;
	      // configurationObj.lines[indexLine].columns[numcolumn].control.subtype 					= extractedProps.formlySubtype;
	      // /**
	      //  * templateOptions
	      //  */
	      // configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions = {
	      //                                                                                   label				: '',
	      //                                                                                   required		: false,
	      //                                                                                   description	: '',
	      //                                                                                   placeholder	: '',
	      //                                                                                   options			: []
	      //                                                                                 };
	      //  /**
	      //   * then bind template option
	      //   */
	      // configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label 				= extractedProps.formlyLabel;
	      // configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required 		= extractedProps.formlyRequired;
	      // configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description 	= extractedProps.formlyDesciption;
	      // configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder 	= extractedProps.formlyPlaceholder;
	      // configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options 			= extractedProps.formlyOptions;

	      // /**
	      //  * add additionnal — particular — properties :
	      //  * 
	      //  * -> datepicker : datepickerPopup
	      //  */
	      // if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
	      //  	configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup = extractedProps.datepickerPopup;
	      // }	

	      // /**
	      //  * unique key (set only first time) in this model is formly control type + Date.now(); 
	      //  */
	      // var newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

	      // if (validKeyUniqueness(newKey, configurationObj) === true){
	      //   configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
	      // }else{
	      //   newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
	      //   if (validKeyUniqueness(newKey, configurationObj) === true){
	      //     configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
	      //   }else{
	      //     newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
	      //   }
	      // }                                                                     

	      // configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;

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
														'formlyDetailedModel' : getFormlyDetailedContorlModelFromDragDropObject(lineValue[i]),
														//'configModelCtrl' : controllerModalProxy.
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

