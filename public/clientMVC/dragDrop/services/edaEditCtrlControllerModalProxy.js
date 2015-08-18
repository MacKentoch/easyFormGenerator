/**
 *  ------------------------------------------------------
 *  service : controllerModalProxy
 *  ------------------------------------------------------
 *
 *  service dedicated to - edit control - (controller modal proxy)
 * 
 * ——————————————————————————————————————————————
 * MIT (2015) - Erwan Datin (MacKentoch)
 * https://github.com/MacKentoch/easyFormGenerator
 * ——————————————————————————————————————————————
**/
angular
	.module('edaApp.services.edaEditCtrlControllerModalProxy', [])
	.factory('controllerModalProxy', [	'EasyFormGenFormlyBindingModels',

	function( EasyFormGenFormlyBindingModels ){
		

				
		/***
		 * Service itself (no more no less)
		 */
		var Service = {};

		/**
		 * model shared between 
		 * 
		 * - main controller (where configuration model comes from)
		 * AND
		 * - modal or sidepanel controller (where controls are configured/customized)
		 */
		Service.ProxyModel = {};//angular.copy(EasyFormGenFormlyBindingModels.getEasyFormListControls());
		resetProxyModel();
		/**
		 * deprecated : in drag and drop version
		 * 							use "resetProxyModel()"" 
		 */
	  function resetNyaSelect(nyaSelectObj){

	    var newNyaSelectObj = EasyFormGenFormlyBindingModels.getEasyFormListControls();

	  	angular.copy(newNyaSelectObj, nyaSelectObj);
	    return true;
	  }
		
		/**
		 * reset proxyModel
		 */
	  function resetProxyModel(){

	    var newProxyModel = EasyFormGenFormlyBindingModels.getEasyFormListControls();

	  	Service.proxyModel = angular.copy(newProxyModel);
	    return true;
	  }		
	  
	  function returnControlFromAddCtrlModalModel(CtrlModalModel){

	    var modelToReturn = {
	          selectedControl		: 'none',
	          formlyType 				: 'none',
	          formlySubtype			: 'none',
	          formlyLabel				: '',
	          formlyRequired 		: false,
	          formlyDesciption	: '',
	          formlyPlaceholder	: '',
	          formlyOptions			: []
	    };

	    for (var i = CtrlModalModel.controls.length - 1; i >= 0; i--) {
	      if (CtrlModalModel.selectedControl === CtrlModalModel.controls[i].id) {

	        modelToReturn.selectedControl 	= CtrlModalModel.selectedControl;
	        modelToReturn.formlyType 				= CtrlModalModel.controls[i].formlyType;
	        modelToReturn.formlySubtype 		= CtrlModalModel.controls[i].formlySubtype;
	        modelToReturn.formlyLabel 			= CtrlModalModel.controls[i].formlyLabel;
	        modelToReturn.formlyRequired 		= CtrlModalModel.controls[i].formlyRequired;
	        modelToReturn.formlyDesciption 	= CtrlModalModel.controls[i].formlyDesciption;
	        modelToReturn.formlyPlaceholder = CtrlModalModel.controls[i].formlyPlaceholder;
	        modelToReturn.formlyOptions 		= CtrlModalModel.controls[i].formlyOptions;
	        /**
	         * particular properties 
	         * 
	         * here ; datetpicker format
	         */
	        if (CtrlModalModel.controls[i].formlyType === 'datepicker') {
						modelToReturn.datepickerPopup = CtrlModalModel.controls[i].datepickerPopup;   
	        }
	      }
	    }
	    return modelToReturn;
	  }
	  
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

	  /**
	   * return selected control ID (proxyModel)
	   * -> from configuration model selected indexes (line, column) 
	   * 		+ control.formlyType 
	   *   	+ control.formlySubtype
	   */
	  function getSelectedProxyModel(configurationSelectedCtrl){
	  	var selectedProxyModelControl = 'none';
	  	var listProxyModelCTRL = angular.copy(EasyFormGenFormlyBindingModels
	  																					.getEasyFormListControls().controls);

	  	listProxyModelCTRL.forEach(function(control){
	  		if (control.formlyType 		=== configurationSelectedCtrl.type &&
	  				control.formlySubtype === configurationSelectedCtrl.subtype) {

	  				selectedProxyModelControl = control.id;
	  				
	  				return selectedProxyModelControl;

	  		}
	  	});


	  	return selectedProxyModelControl;
	  }

		/**
		 * deprecated in drag and drop version
		 * 
		 * use initProxyModel insead
		 */
		Service.initNyaSelect = function(nyaSelectObj){
    	return resetNyaSelect(nyaSelectObj);
    };

		/**
		 * return nyaSelectModel from Selected control in configuration model
		 * 
		 * note : deprecated in drag and drop version since no modal involved so just set private nyasSelect object.
		 * 				-> in drag and drop version : use 'setProxyModelFromConfigurationSelection' instead 
		 * 					to set private object that will be readable to side edit panel
		 */
    Service.getNyASelectFromSelectedLineColumn = function(nyaSelectObj, configurationObj, indexLine, numcolumn){
	    resetNyaSelect(nyaSelectObj);  
	    /**
	     * data send to modal controller
	     */
	    if (typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions != 'undefined') {

	      nyaSelectObj.temporyConfig.selectedControl 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl : 'none';
	      nyaSelectObj.temporyConfig.formlyLabel 				= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
	      nyaSelectObj.temporyConfig.formlyRequired	 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
	      nyaSelectObj.temporyConfig.formlyDesciption 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
	      nyaSelectObj.temporyConfig.formlyPlaceholder 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
	      nyaSelectObj.temporyConfig.formlyOptions 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';
	      /**
	       * particular case : datepicker
	       */
	      if (nyaSelectObj.temporyConfig.selectedControl === 'Date') {
	      	nyaSelectObj.temporyConfig.datepickerPopup = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';
	      }
	    }
	    return nyaSelectObj;
		};
	
		
		/**
		 * deprecated in drag and drop version : 
		 * 	use bindConfigurationModelFromProxyModel to refresh configuration after control update in side panel
		 * 
		 * will be used in closePanel
		 */
		Service.bindConfigurationModelFromModalReturn =  function(indexLine, numcolumn, modalAddCtrlModel, configurationObj){
				      
				      var extractedProps = returnControlFromAddCtrlModalModel(modalAddCtrlModel);

				      configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl 	= extractedProps.selectedControl;
				      configurationObj.lines[indexLine].columns[numcolumn].control.type 						= extractedProps.formlyType;
				      configurationObj.lines[indexLine].columns[numcolumn].control.subtype 					= extractedProps.formlySubtype;
				      /**
				       * templateOptions
				       */
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions = {
		                                                                                            label				: '',
		                                                                                            required		: false,
		                                                                                            description	: '',
		                                                                                            placeholder	: '',
		                                                                                            options			: []
				                                                                                      };
				       /**
				        * then bind template option
				        */
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label 				= extractedProps.formlyLabel;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required 		= extractedProps.formlyRequired;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description 	= extractedProps.formlyDesciption;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder 	= extractedProps.formlyPlaceholder;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options 			= extractedProps.formlyOptions;

				      /**
				       * add additionnal — particular — properties :
				       * 
				       * -> datepicker : datepickerPopup
				       */
				      if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
				       	configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup = extractedProps.datepickerPopup;
				      }	

				      /**
				       * unique key (set only first time) in this model is formly control type + Date.now(); 
				       */
				      var newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

			        if (validKeyUniqueness(newKey, configurationObj) === true){
			          configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
			        }else{
			          newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
			          if (validKeyUniqueness(newKey, configurationObj) === true){
			            configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
			          }else{
			            newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
			          }
			        }                                                                     

				      configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;

		};

		Service.applyConfigToSelectedControl = function(nyaSelectObj){
				  	
				    for (var i = nyaSelectObj.controls.length - 1; i >= 0; i--) {
				      if (nyaSelectObj.controls[i].id === nyaSelectObj.selectedControl) {

				          nyaSelectObj.controls[i].formlyLabel 				= nyaSelectObj.temporyConfig.formlyLabel;
				          nyaSelectObj.controls[i].formlyRequired 		= nyaSelectObj.temporyConfig.formlyRequired;
				          nyaSelectObj.controls[i].formlyDesciption 	= nyaSelectObj.temporyConfig.formlyDesciption;
				          nyaSelectObj.controls[i].formlyPlaceholder 	= nyaSelectObj.temporyConfig.formlyPlaceholder;
				          nyaSelectObj.controls[i].formlyOptions 			= nyaSelectObj.temporyConfig.formlyOptions;

				          if (nyaSelectObj.controls[i].id ==='Date' ) {
				          	nyaSelectObj.controls[i].datepickerPopup 	= nyaSelectObj.temporyConfig.datepickerPopup;  	
				          }
				        
				       }
				    }
		};

		/**
		 * ============================================================
		 * following methods for "proxyModell"
		 * 
		 * Note this model : 
		 * - to share control model between 
		 * 	+ main controller (configuration model one)
		 * 	+ edit panel controller (where apply customization to a selected control)
		 * ============================================================
		 */
		
		 
		/**
		 * reset proxy model
		 */
		Service.initProxyModel = function(thisProxyModelToInit){
    	return resetProxyModel(thisProxyModelToInit);
    };		 
		 
		/**
		 * to refresh configuration model from edit panel
		 */
		Service.bindConfigurationModelFromProxyModel =  function(indexLine, numcolumn, configurationObj){
				      
				      var extractedProps = angular.copy(Service.proxyModel.temporyConfig);
							
							/**
							 * debug : todel this lines
							 */
							console.warn('debug edaEditCtrlControllerModalProxy'); 
							console.dir(extractedProps);

				      configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl 	= extractedProps.selectedControl;
				      configurationObj.lines[indexLine].columns[numcolumn].control.type 						= extractedProps.formlyType;
				      configurationObj.lines[indexLine].columns[numcolumn].control.subtype 					= extractedProps.formlySubtype;
				      /**
				       * templateOptions
				       */
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions = {
		                                                                                            label				: '',
		                                                                                            required		: false,
		                                                                                            description	: '',
		                                                                                            placeholder	: '',
		                                                                                            options			: []
				                                                                                      };
				       /**
				        * then bind template option
				        */
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label 				= extractedProps.formlyLabel;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required 		= extractedProps.formlyRequired;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description 	= extractedProps.formlyDesciption;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder 	= extractedProps.formlyPlaceholder;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options 			= extractedProps.formlyOptions;

				      /**
				       * add additionnal — particular — properties :
				       * 
				       * -> datepicker : datepickerPopup
				       */
				      if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
				       	configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup = extractedProps.datepickerPopup;
				      }	

				      /**
				       * unique key (set only first time) in this model is formly control type + Date.now(); 
				       */
				      var newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

			        if (validKeyUniqueness(newKey, configurationObj) === true){
			          configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
			        }else{
			          newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
			          if (validKeyUniqueness(newKey, configurationObj) === true){
			            configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
			          }else{
			            newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
			          }
			        }                                                                     

				      configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;

		};		 
		 
		 
		/**
		 * set local proxyModel from Selected control in configuration model
		 * 
		 * replace deprecated "getNyASelectFromSelectedLineColumn"
		 * -model is now named "proxyModel"
		 * -model is stored in this service 
		 * 
		 * -> it has just more sence!
		 */
		
    Service.setProxyModelFromConfigurationSelection = function(configurationObj, indexLine, numcolumn){
	    /**
	     * data send to modal controller
	     */
	    if (typeof configurationObj.lines[indexLine].columns[numcolumn].control != 'undefined') {

	    	/**
	    	 * determine selected control from indexes 
	    	 * and control.type and control.subtype in configuration model
	    	 */

	    	Service.proxyModel.selectedControl 									= typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? getSelectedProxyModel(configurationObj.lines[indexLine].columns[numcolumn].control) : 'none';
	      Service.proxyModel.temporyConfig.selectedControl 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? getSelectedProxyModel(configurationObj.lines[indexLine].columns[numcolumn].control) : 'none';
				
				Service.proxyModel.temporyConfig.formlyType 				= typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.type: 'none';
				Service.proxyModel.temporyConfig.formlySubtype 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.subtype != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.subtype : 'none';
				
	      Service.proxyModel.temporyConfig.formlyLabel 				= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
	      Service.proxyModel.temporyConfig.formlyRequired	 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
	      Service.proxyModel.temporyConfig.formlyDesciption 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
	      Service.proxyModel.temporyConfig.formlyPlaceholder 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
	      Service.proxyModel.temporyConfig.formlyOptions 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';
	      /**
	       * particular case : datepicker
	       */
	      if (Service.proxyModel.temporyConfig.selectedControl === 'Date') {
	      	Service.proxyModel.temporyConfig.datepickerPopup = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';
	      }
	    }

	    
	    // console.info('setProxyModelFromConfigurationSelection');
	    // console.dir(	
	    // 							{
	    // 								'fromService' : 'setProxyModelFromConfigurationSelection method',
	    // 								'after' : 'applied config',
	    // 								'Service.proxyModel' 	: angular.copy(Service.proxyModel)
	    // 							}
	    // 						);


	    return Service.proxyModel;
		};			 

		Service.getProxyModel = function(){
			return Service.proxyModel;
		};


		/**
		 * ============================================================
		 * following methods for "editPanelModel"
		 * 
		 * Note this model : 
		 * - to manage side edit control panel
		 * ============================================================
		 */
		 
		var editPanelModel = {
                            toggle : false,
                            lineIndex : -1,
                            columnIndex : -1,
                            control : {}
                          };
				 
		/**
		 * getter : editPanelModel (whole model => type = object)
		 */			 
		Service.getEditPanelModelAllModel = function(){
			return editPanelModel;
		};
		/**
		 * setter : editPanelModel (whole model => type = object)
		 */		
		Service.setEditPanelModelControl = function(newEditPanelModel){
			var successfullDone  = false;
			
			if (typeof newEditPanelModel !== 'undefined') {
				editPanelModel = angular.copy(newEditPanelModel);
				successfullDone = true;	
			}
			
			return successfullDone;
		};		
		
		
		/**
		 * getter : editPanelModel.columnIndex
		 */		
		Service.getEditPanelModelColumnIndex = function(){
			return editPanelModel.columnIndex;
		};
		/**
		 * setter : editPanelModel.columnIndex
		 */				
		Service.setEditPanelModelColumnIndex = function(newColumnIndex){
			var successfullDone  = false;
			
			if (typeof newColumnIndex !== 'undefined') {
				editPanelModel.columnIndex = newColumnIndex;
				successfullDone = true;	
			}
			
			return successfullDone;
		};		
		
		
		/**
		 * getter : editPanelModel.lineIndex
		 */			
		Service.getEditPanelModelLineIndex = function(){
			return editPanelModel.lineIndex;
		};
		/**
		 * setter : editPanelModel.lineIndex
		 */		
		Service.setEditPanelModelLineIndex = function(newLineIndex){
			var successfullDone  = false;
			
			if (typeof newLineIndex !== 'undefined') {
				editPanelModel.lineIndex = newLineIndex;
				successfullDone = true;	
			}
			
			return successfullDone;
		};

		/**
		 * getter : editPanelModel.control
		 */		
		Service.getEditPanelModelControl = function(){
			return editPanelModel.control;
		};		
		/**
		 * setter : editPanelModel.control
		 */
		Service.setEditPanelModelControl = function(newControl){
			var successfullDone  = false;
			
			if (typeof newControl !== 'undefined') {
				//editPanelModel.control = angular.copy({});
				editPanelModel.control = angular.copy(newControl);
				successfullDone = true;	
			}
			
			return successfullDone;
		};

		/**
		 * getter : editPanelModel.toggle
		 */
		Service.getEditPanelModelToggle = function(){
			return editPanelModel.toggle;
		};
		/**
		 * setter : editPanelModel.toggle
		 */
		Service.setEditPanelModelToggle = function(newToggleValue){
			var successfullDone  = false;
			
			if (typeof newToggleValue !== 'undefined') {
				editPanelModel.toggle = newToggleValue;
				successfullDone = true;	
			}
			
			return successfullDone;
		};

		
		/**
		 * special controls bindings from edit panel
		 * -> controls like basic select, radio and groupe select
		 */
		
		/**
		 * special controls temporay models
		 *
		 * -> helps in side panel to add aditionnal properties 
		 * like options for selects...
		 */
		var initOptionModel 								= { rows:[] };

		Service.basicSelectRowCollection 		= angular.copy(initOptionModel);
		Service.newOptionBasicSelect 				= angular.copy({ saisie: '' });

		Service.groupedSelectRowCollection 	= angular.copy(initOptionModel);
		Service.newOptionGroupedSelect 			= angular.copy({ saisie: '' });
		Service.GroupedSelectGroups 				= angular.copy({ list:[] });
		Service.newGroupGroupedSelect 			= angular.copy({ saisie: '' });
		Service.groupSelectGroupClick 			= angular.copy({ showList : false });

		Service.radioRowCollection 					= angular.copy(initOptionModel);
		Service.newOptionRadio 							= angular.copy({ saisie: '' });

		Service.resetAllTemporyModels = function(){
			//basic select : shallow copy way (= basicSelectRowCollection shared with groupedSelectRowCollection and radioRowCollection)
			//Service.basicSelectRowCollection 		= initOptionModel;
			//Service.newOptionBasicSelect 				= { saisie: '' };

			//basic select :  deep copy way :
			Service.basicSelectRowCollection 		= angular.copy(initOptionModel);
			Service.newOptionBasicSelect 				= angular.copy({ saisie: '' });

			//grouped select : shallow copy way :
			// Service.groupedSelectRowCollection 	= initOptionModel;
			// Service.newOptionGroupedSelect 			= { saisie: '' };
			// Service.GroupedSelectGroups 				= { list:[] };
			// Service.newGroupGroupedSelect 			= { saisie: '' };
			// Service.groupSelectGroupClick 			= { showList : false };

			//grouped select :  deep copy way :
			Service.groupedSelectRowCollection 	= angular.copy(initOptionModel);
			Service.newOptionGroupedSelect 			= angular.copy({ saisie: '' });
			Service.GroupedSelectGroups 				= angular.copy({ list:[] });
			Service.newGroupGroupedSelect 			= angular.copy({ saisie: '' });
			Service.groupSelectGroupClick 			= angular.copy({ showList : false });

			//radio : shallow copy way :
			// Service.radioRowCollection 					= initOptionModel;
			// Service.newOptionRadio 							= { saisie: '' };

			//radio : deep copy way :
			Service.radioRowCollection 					= angular.copy(initOptionModel);
			Service.newOptionRadio 							= angular.copy({ saisie: '' });

			return true;
		};		

	/**
	 * bindSpecialCtrlTemporyModelsToProxyModel: needed when validating after editing a control
	 * tempory models applied to proxyModel if control is one of these
	 *
	 * example : if selected control is a basic select options 
	 * -> so its tempory models are bound to proxyModel
	 */
	Service.bindSpecialCtrlTemporyModelsToProxyModel = function(){
		if (Service.proxyModel.selectedControl === 'BasicSelect') {
		  Service.bindBasicSelectToProxyModel(Service.basicSelectRowCollection);
		}

		if (Service.proxyModel.selectedControl === 'GroupedSelect') {
		  Service.bindGroupedSelectToProxyModel(Service.groupedSelectRowCollection);
		}  

		if (Service.proxyModel.selectedControl === 'Radio') {
		  Service.bindRadioToProxyModel(Service.radioRowCollection);
		}  
	};

		/**
		 * basic select
		 */
		


		Service.bindBasicSelectFromProxyModel = function(basicSelectRowCollection){		
		    if (Service.proxyModel.temporyConfig.formlyOptions.length > 0) {
		      for (var i = 0; i <= Service.proxyModel.temporyConfig.formlyOptions.length-1; i++){
		
		            var newOption = {
		            									'option' 	: Service.proxyModel
		            																			.temporyConfig.formlyOptions[i].name,
		                      				'order' 	: i,

		                      				'group' 	: ''
		                    				};

		            basicSelectRowCollection.rows.push(newOption);
		      }    
		    }
		  };

		 Service.bindBasicSelectToProxyModel = function(basicSelectRowCollection){
		    var resetNyASelectOptions = [];
		    Service.proxyModel.temporyConfig.formlyOptions = resetNyASelectOptions;
		    if (basicSelectRowCollection.rows.length > 0) {
		      for (var i = 0; i <= basicSelectRowCollection.rows.length - 1; i++){
		            var newOption = {
		            									'name' : basicSelectRowCollection.rows[i].option,

		                      				'value': i,

		                      				'group': ''
		                    				};

		            Service.proxyModel.temporyConfig.formlyOptions.push(newOption);
		        }      
		   }
		  };


		  /**
		   * grouped select
		   */
		 Service.bindGroupedSelectFromProxyModel = function(groupedSelectRowCollection, GroupedSelectGroups){
		    if (Service.proxyModel.temporyConfig.formlyOptions.length > 0) {
		      for (var i = 0; i <= Service.proxyModel.temporyConfig.formlyOptions.length-1; i++){		
		            var newOption = {
		            									'option' 	: Service.proxyModel.temporyConfig.formlyOptions[i].name,
		                      				'order'		: i,
		                      				'group'		: Service.proxyModel.temporyConfig.formlyOptions[i].group
		                    				};
		            groupedSelectRowCollection.rows.push(newOption);            
		        }
		        //grouplist : thx to lodash it is easy
		       var filteredgroup = _.uniq(_.pluck(groupedSelectRowCollection.rows, 'group'));
		       angular.copy(filteredgroup, GroupedSelectGroups.list); 		
		    }
		 };



		Service.bindGroupedSelectToProxyModel = function(groupedSelectRowCollection){
		    Service.proxyModel.temporyConfig.formlyOptions = [];
		    for (var i = 0; i <= groupedSelectRowCollection.rows.length - 1; i++){
		          var newOption = {
		          									'name' 	: groupedSelectRowCollection.rows[i].option,
		                    				'value'	: i,
		                    				'group'	: groupedSelectRowCollection.rows[i].group
		                  				};
		          Service.proxyModel.temporyConfig.formlyOptions.push(newOption);   
		      }
		};
		
		
		/**
		 * radio
		 */
		Service.bindRadioFromProxyModel = function(radioRowCollection){
		    if (Service.proxyModel.temporyConfig.formlyOptions.length > 0) {
		      for (var i = 0; i <= Service.proxyModel.temporyConfig.formlyOptions.length-1; i++){
		
		            var newOption = { 
		                              'option'	: Service.proxyModel.temporyConfig.formlyOptions[i].name,
		                              'order'		: i,
		                              'group'		: ''
		                            };
		            radioRowCollection.rows.push(newOption);
		      }    
		    }
		};

		// Service.bindProxyModelOptionFromRadio = function(radioRowCollection){
		//     if (radioRowCollection.rows.length > 0) {
		// 			Service.proxyModel.temporyConfig.formlyOptions = [];
		//       for (var i = 0; i <= radioRowCollection.rows.length-1; i++){
		// 
		//             var newOption = { 
		//                               'name'		: radioRowCollection.rows[i].option,
		//                               'value'		: i,
		//                               'group'		: ''
		//                             };
		//             Service.proxyModel.temporyConfig.formlyOptions.push(newOption);
		//       }    
		//     }
		// };


		Service.bindRadioToProxyModel = function(radioRowCollection){
		    var resetproxyModelOptions = [];
		    Service.proxyModel.temporyConfig.formlyOptions = resetproxyModelOptions;
		
		    if (radioRowCollection.rows.length > 0) {
		
		      for (var i = 0; i <= radioRowCollection.rows.length - 1; i++){
		            var newOption = {
		                              'name'		: radioRowCollection.rows[i].option,
		                              'value'		: i,
		                              'group'		: ''
		                    };
		            Service.proxyModel.temporyConfig.formlyOptions.push(newOption);   
		        }       
		   }
		};

 		  



    return Service;

  }]);

