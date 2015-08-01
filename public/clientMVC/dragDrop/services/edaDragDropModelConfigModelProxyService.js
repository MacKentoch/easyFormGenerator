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
			 * valid a control key is unique
			 *
			 * yes... function name already told us that, 
			 * -> it's just confirmation and to see if
			 *    you keep focus while reading it ^^
			 */
			function validKeyUniqueness(thisKey, configurationObj){
			  var isUnique = true;
			  for (var i = configurationObj.lines.length - 1; i >= 0; i--) {
			    for (var j = configurationObj.lines[i].columns.length - 1; j >= 0; j--) {
			      if (configurationObj.lines[i].columns[j].control.key === thisKey) {
			        isUnique = false;
			      }
			    } 
			  }
			  return isUnique;  
			} 


			function createUniqueKey(baseKeyValue, configurationObj){
				/**
	       * unique key (set only first time) in this model is formly control type + Date.now(); 
	       */
	      var newKey = baseKeyValue + '-' + Date.now();
	      if (validKeyUniqueness(newKey, configurationObj) === true){
	        return newKey;
	      }else{
	        newKey = baseKeyValue + '-' + Date.now();
	        if (validKeyUniqueness(newKey, configurationObj) === true){
	          return newKey;
	        }else{
	          newKey = baseKeyValue + '-' + Date.now();
	          return newKey;
	        }
	      } 

			}

			/**
			 * bind formly detailed model to configuration control model
			 */
			function bindConfigCtrlModelFromFormlyDetailedCtrlModel(formlyDetailCtrlModel, configurationCtrlModel, configModel){
				

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

				//set key :	
				$parse('control.key')
					.assign(configurationCtrlModel, createUniqueKey($parse('control.type')(configurationCtrlModel), configModel));

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

					$parse('control.templateOptions.datepickerPopup')
						.assign(configurationCtrlModel, $parse('datepickerPopup')(formlyDetailCtrlModel));

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
					var newLineLength = configModel.lines.push(EasyFormGenFormlyBindingModels.getEasyFormEmptyConfigurationLineModel());
					

					/**
					 * iterate through columns
					 * and add them if control exists
					 */
					angular.forEach(lineValue, function(colValue, colIndex){

						configModel.lines[newLineLength - 1].columns = [];


						console.warn('fixing binding at line : ' + keyValue + 'column : ' + colIndex);
						console.dir(	
													{
														'at line :' 					: keyValue,
														'linevalue : ' 				: lineValue,
														'Nb column in line'		: lineValue.length,
														'colIndex'						: colIndex,
														'colValue : ' 				: lineValue[colIndex],
														'formlyDetailedModel' : getFormlyDetailedContorlModelFromDragDropObject(lineValue[colIndex]),
														'control config model': EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(lineValue.length, getFormlyDetailedContorlModelFromDragDropObject(lineValue[colIndex]).formlyType)
														//'configModelCtrl' : controllerModalProxy.
													}
												);
						 if (lineValue[colIndex]) {
				    	/**
				    	 * push an emty control model but relative to dradrop ::model control type
				    	 * (if datepicker so additionnal properties are added)
				    	 */
				    	var columnsLength = configModel.lines[keyValue].columns.push(
				    			{
				    				control : EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(	lineValue.length, 
				    																																													getFormlyDetailedContorlModelFromDragDropObject(lineValue[colIndex]).formlyType
				    																																												)
				    			}
				    	);
				    	/**
				    	 * bind dragdrop control properties to configuration model
				    	 */
				    	bindConfigCtrlModelFromFormlyDetailedCtrlModel(	getFormlyDetailedContorlModelFromDragDropObject(lineValue[colIndex]), 
				    																									configModel.lines[keyValue].columns[columnsLength - 1], 
				    																									configModel);
						}

					});


					console.dir({
						title 			: 'this line modified configuration model',
						configurationModel : angular.copy(configModel)
					});
										

				});


				return true;
			};



			return Service;


	}]);

