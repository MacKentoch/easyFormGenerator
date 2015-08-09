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
		
		/**
		 * model shared between main controller (where configuration model comes from)
		 * and modal or sidepanel controller (where controls are configured/customized)
		 */
		var proxyModel = {};
				
		/***
		 * Service itself
		 */
		var Service = {};

		
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

	    var newNyaSelectObj = EasyFormGenFormlyBindingModels.getEasyFormListControls();

	  	angular.copy(newNyaSelectObj, proxyModel);
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

		Service.initNyaSelect = function(nyaSelectObj){
    	return resetNyaSelect(nyaSelectObj);
    };

		/**
		 * return nyaSelectModel from Selected control in configuration model
		 * 
		 * note : deprecated in drag and drop version since no modal involved so just set private nyasSelect object.
		 * 				-> in drag and drop version : use 'setNyASelectFromSelectedLineColumn' instead 
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
		 * set local nyaSelectModel from Selected control in configuration model
		 * 
		 * note : deprecated in drag and drop version since no modal involved so just set private nyasSelect object.
		 * 				-> in drag and drop version : use 'setNyASelectFromSelectedLineColumn' instead 
		 * 					to set private object that will be readable to side edit panel
		 */
    Service.setNyASelectFromSelectedLineColumn = function(configurationObj, indexLine, numcolumn){
	    resetProxyModel();  
	    /**
	     * data send to modal controller
	     */
	    if (typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions != 'undefined') {

	      proxyModel.temporyConfig.selectedControl 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl : 'none';
	      proxyModel.temporyConfig.formlyLabel 				= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
	      proxyModel.temporyConfig.formlyRequired	 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
	      proxyModel.temporyConfig.formlyDesciption 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
	      proxyModel.temporyConfig.formlyPlaceholder 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
	      proxyModel.temporyConfig.formlyOptions 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';
	      /**
	       * particular case : datepicker
	       */
	      if (proxyModel.temporyConfig.selectedControl === 'Date') {
	      	proxyModel.temporyConfig.datepickerPopup = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';
	      }
	    }
	    return proxyModel;
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
		 * following methods for "editPanelModel""
		 */
		 
		/**
		 * editPanelModel 
		 * 
		 * manage 
		 * - side panel toggle
		 * - control identification (line index and column index)
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
		Service.getSideEditPanelModelAllModel = function(){
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
		Service.getSideEditPanelModelColumnIndex = function(){
			return editPanelModel.columnIndex;
		};
		/**
		 * setter : editPanelModel.columnIndex
		 */				
		Service.setEditPanelModelColumnIndex = function(newColumnIndex){
			var successfullDone  = false;
			
			if (typeof newColumnIndex !== 'undefined') {
				editPanelModel.lineIndex = newColumnIndex;
				successfullDone = true;	
			}
			
			return successfullDone;
		};		
		
		
		/**
		 * getter : editPanelModel.lineIndex
		 */			
		Service.getSideEditPanelModelLineIndex = function(){
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


    return Service;

  }]);

