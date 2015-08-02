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
				    				control : angular.copy(EasyFormGenFormlyBindingModels
				    											.getFormlyControlTemplateForNcolumnLine(	lineValue.length, 
				    																																getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]).formlyType
				    																															))
				    			};
				    	/**
				    	 * bind dragdrop control properties to configuration model through controlToBind var
				    	 */
				    	bindConfigCtrlModelFromFormlyDetailedCtrlModel(	getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]), 
				    																									controlToBind, 
				    																									configModel);
				    	/**
				    	 * apply controlToBind var to configuration model control
				    	 */
				    	if (typeof configModel.lines[keyValue].columns[colIndex] === 'undefined') configModel.lines[keyValue].columns.push(angular.copy( EasyFormGenFormlyBindingModels.getEasyFormConfigurationEmptyControlModel())); 

							
							configModel.lines[keyValue].columns[colIndex].control = angular.copy(controlToBind.control);
				    	configModel.lines[keyValue].columns[colIndex].numColumn = colIndex + 1;
				    	configModel.lines[keyValue].columns[colIndex].exist = true;

					});
										
				});


				return configModel;
			};



			return Service;


	}]);

