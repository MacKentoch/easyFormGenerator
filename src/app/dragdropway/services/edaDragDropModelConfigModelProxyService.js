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
																							'dragDropConfig',
																							'$parse',
		function( EasyFormGenFormlyBindingModels, controllerModalProxy, dragDropConfig, $parse){


			/**
			 * return a control model that is more formly detailed
			 * (more formly detailed : see controls property in EasyFormGenFormlyBindingModels._easyFormListControls)
			 */
			function getFormlyDetailedControlModelFromDragDropObject(dragDrapCtrlModel){
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
			    	if (typeof configurationObj.lines[i].columns[j].control !== 'undefined') {
				      if (configurationObj.lines[i].columns[j].control.key === thisKey) {
				        isUnique = false;
				      }			    		
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
			 * apply this line
			 */
			function applyThisLine(linevalue, lineIndex, configModel){
				angular.forEach(configModel.lines, function(aLineValue, aLineKey){
					if (aLineKey === lineIndex){ 
						aLineValue.line = linevalue;
					}
				});
			}

			/**
			 * bind formly detailed model to configuration control model
			 */
			function bindConfigCtrlModelFromFormlyDetailedCtrlModel(formlyDetailCtrlModel, configurationCtrlModel, configModel){
				/**
				 *
				 * 
				 * TODO :properties should be served by provider 
				 *
				 * more configurable without pain
				 *
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

			}


			var Service = {};

			/**
			 * refreshAllConfigurationFromDragAndDropModel 
			 */
			Service.refreshAllConfigurationFromDragAndDropModel = function(configModel, ddModel){
				/**
				 * TODO : prevent reset already set props
				 * 
				 * previousConfigurationModel = a backup of configuration model 'configModel 'before resetting it
				 * 
				 * -> dragDrop model contains unique keys of already existing controls : these controls must not be reset / overwritten  
				 * 
				 */
				var previousConfigurationModel = angular.copy(configModel); 
				
				
				configModel.lines = [];
				/**
				 * iterates line config model
				 */
				angular.forEach(ddModel[1], function(lineValue, keyValue){
					/**
					 * add empty line 1st 
					 * if line is empty -> it will be enough
					 */
					configModel.lines.push(angular.copy(EasyFormGenFormlyBindingModels.getEasyFormEmptyConfigurationLineModel()));
					/**
					 * update line value field
					 */
					applyThisLine(keyValue + 1, keyValue, configModel);
					/**
					 * iterate through columns
					 * and add them if control exists
					 */	
					angular.forEach(lineValue, function(colValue, colIndex){
				    	/**
				    	 * push an empty control model but relative to dradrop : model control type
				    	 * (if datepicker so additionnal properties are added)
				    	 */ 	
							var controlToBind = 
									{
				    				control : angular
				    										.copy(EasyFormGenFormlyBindingModels
				    														.getFormlyControlTemplateForNcolumnLine(	
																																									lineValue.length, 
				    																																			getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]).formlyType
				    																																		)
				    													)
				    			};
							var formlyDetailedControlModel = getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]);
							/**
							 * controls alreadys existed so do not reset it
							 * 
							 * control to bind is the previous one
							 */		
							if(typeof colValue.key !== 'undefined'){
								//console.warn('debug dragdropModel show this control key : ' + colValue.key);
								
								controlToBind.control = angular.copy(colValue.configModelControl);
								//update cssClass depending new position:
								var newClassName = EasyFormGenFormlyBindingModels
												    														.getFormlyControlTemplateForNcolumnLine(	
																																									lineValue.length, 
				    																																			getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]).formlyType
				    																																	);
							controlToBind.control.className = newClassName.className;
							//test if header nee this one
							controlToBind.control.cssClass = newClassName.className;
							
																																														
								/**
								 * get control details for this key in backup : previousConfigurationModel
								 */
							}else{
								
								/**
								* controls did not exists before : control to bind is a new one
								* bind dragdrop control properties to configuration model through controlToBind var
								*/
								bindConfigCtrlModelFromFormlyDetailedCtrlModel(	
																																formlyDetailedControlModel, //getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]), 
																																controlToBind, 
																																configModel
																															);
							}	
				    	/**
				    	 * apply controlToBind var to configuration model control
				    	 */
				    	if (typeof configModel.lines[keyValue].columns[colIndex] === 'undefined') configModel.lines[keyValue].columns.push(angular.copy( EasyFormGenFormlyBindingModels.getEasyFormConfigurationEmptyControlModel())); 

							
							configModel.lines[keyValue].columns[colIndex].control 	= angular.copy(controlToBind.control);
				    	configModel.lines[keyValue].columns[colIndex].numColumn = colIndex + 1;
				    	configModel.lines[keyValue].columns[colIndex].exist 		= true;

					});
										
				});
				
				return configModel;
			};
			
			/**
			 * drag drop model
			 * -> will be used to bind configuration model
			 * 	of no key saved, configuration model controls would be reset each drop events
			 * 
			 * -> matching key : will prevent to reset existing control
			 */
			Service.refreshControlsKeys = function(configModel, dragDropModel){				
				
				angular.forEach(configModel.lines, function(aConfigLine, aConfigLineIndex){						
						angular.forEach(aConfigLine.columns, function(aConfigControl, aConfigControlIndex){
							//if last control removed from line
							//and dragDrop model did not already removed this line
							if(typeof dragDropModel[1][aConfigLineIndex] !== 'undefined'){
								if(dragDropModel[1][aConfigLineIndex].length > 0){
									dragDropModel[1][aConfigLineIndex][aConfigControlIndex].key = aConfigControl.control.key;
									//need to save all in dragdropModel as it is a reference
									//configModel still needed 
									// -> to keep coherence (same back model) between all version of easyForm Generator
									// -> is the back model (can be saved to dataBase)
									dragDropModel[1][aConfigLineIndex][aConfigControlIndex].configModelControl = angular.copy(aConfigControl.control);										
									
								}
							
							}

						});
				});

				// console.info('refreshControlsKeys');
				// console.dir(	
				// 							{
				// 									'when' 							: 'starting',
				// 									'configModel is ' 	: angular.copy(configModel),
				// 									'dragDropModel is ' : angular.copy(dragDropModel)
				// 							}
				// 						);
								
			};

			/**
			 * drag drop model
			 * -> will be used to bind configuration model
			 * 	of no key saved, configuration model controls would be reset each drop events
			 * 
			 * -> matching key : will prevent to reset existing control
			 */
			Service.loadDragDropModelFromConfigurationModel = function(configModel, dragDropModel){				
				//reset dragdrop fields model NOT all dragDropModel!
				dragDropModel[1] = [];
				
				angular.forEach(configModel.lines, function(aConfigLine, aConfigLineIndex){
					//add new line
					dragDropModel[1].push([]);
					angular.forEach(aConfigLine.columns, function(aConfigControl, aConfigControlIndex){
						
						/**
						 * get control type from configuration.control.selectedControl
						 */
						
						var dragdropControlRef = {
							control: 'empty',
							cssClass : 'col-xs-12',
							label: '<div class="col-md-12"> <div class="form-group"> <div class=""> </div> </div></div>'
						};
						
						angular.forEach(dragDropModel[0], function(groupOfCtrlRef, groupOfCtrlRefIndex){
							angular.forEach(groupOfCtrlRef, function(aCtrlref, aCtrlRefIndex){
								if (aCtrlref.control === aConfigControl.control.selectedControl) {
									dragdropControlRef = angular.copy(aCtrlref);
								}
							});
						});
							
						dragDropModel[1][aConfigLineIndex].push(dragdropControlRef);
						
						//update class depending number of control per line
						var cssClassToApply = dragDropConfig.getItemCssDependingNumberItemsInRow(dragDropModel[1][aConfigLineIndex].length);
						angular.forEach(dragDropModel[1][aConfigLineIndex], function(ddControlToUpdate){
						ddControlToUpdate.cssClass = cssClassToApply;
							
						});
						
					});	
											
											
											
				});

				// console.info('bindDragDropModelFromConfigurationModel');
				// console.dir(	
				// 							{
				// 									'when' 							: 'starting',
				// 									'configModel is ' 	: angular.copy(configModel),
				// 									'dragDropModel is ' : angular.copy(dragDropModel)
				// 							}
				// 						);
								
			};

			return Service;


	}]);

