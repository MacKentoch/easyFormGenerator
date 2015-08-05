///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  - edit control -
//	controller modal proxy 
//
//
// NOTE : adding new custom control (template) -> update this service (at least function resetNyaSelect(nyaSelectObj))
//
//  module = "service" 
//  ------------------------------------------------------
//      Syntax (convention) :
//          "ngwfApp" = application
//          "ngwfApp.services.serviceNAME" = container services module
//
//  This module is a service -> it must be injected in services container
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var ngwfEditCtrlControllerModalProxy = angular.module('ngwfApp.services.ngwfEditCtrlControllerModalProxy', []);


ngwfEditCtrlControllerModalProxy.factory('controllerModalProxy', [function(){



  /////////////////////////////////////////
	// proxy services
	/////////////////////////////////////////
    return {
    			initNyaSelect : function(nyaSelectObj){
    				return resetNyaSelect(nyaSelectObj);
    			},

				getNyASelectFromSelectedLineColumn: function(nyaSelectObj, configurationObj, indexLine, numcolumn){
				      resetNyaSelect(nyaSelectObj);
				      
				      //data send to modal controller                                          
				      if (typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions != 'undefined') {

				        nyaSelectObj.temporyConfig.selectedControl = typeof configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl : 'none';
				        nyaSelectObj.temporyConfig.formlyLabel = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
				        nyaSelectObj.temporyConfig.formlyRequired = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
				        nyaSelectObj.temporyConfig.formlyDesciption = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
				        nyaSelectObj.temporyConfig.formlyPlaceholder = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
				        nyaSelectObj.temporyConfig.formlyOptions = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';
								
								nyaSelectObj.temporyConfig.formlyExpressionProperties = typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.formlyExpressionProperties : {};
								nyaSelectObj.temporyConfig.formlyValidators = typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidators : {};
								nyaSelectObj.temporyConfig.formlyValidation = typeof configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.formlyValidation : {};
								

				        //particular case : datepicker
				        if (nyaSelectObj.temporyConfig.selectedControl === 'Date') {
				        	nyaSelectObj.temporyConfig.datepickerPopup = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';

				        }
				      }
				      return nyaSelectObj;
				  },

				  bindConfigurationModelFromModalReturn: function(indexLine, numcolumn, modalAddCtrlModel, configurationObj){
				      
				      var extractedProps = returnControlFromAddCtrlModalModel(modalAddCtrlModel);
				      configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl = extractedProps.selectedControl;
				      configurationObj.lines[indexLine].columns[numcolumn].control.type = extractedProps.formlyType;
				      configurationObj.lines[indexLine].columns[numcolumn].control.subtype = extractedProps.formlySubtype;
				      //reset templateOptions
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions = {
				                                                                                            label: '',
				                                                                                            required: false,
				                                                                                            description: '',
				                                                                                            placeholder: '',
				                                                                                            options: []
				                                                                                          };
				       //then bind templateOptions                                                                                   
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label = extractedProps.formlyLabel;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required = extractedProps.formlyRequired;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description = extractedProps.formlyDesciption;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder = extractedProps.formlyPlaceholder;
				      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options = extractedProps.formlyOptions;

					  //////////////////////////////////////////
				      // add additionnal particular properties
				      //////////////////////////////////////////
				      //-> datepicker : datepickerPopup
				      if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
				       	configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup = extractedProps.datepickerPopup;

				       	//console.warn('bindConfigurationModelFromModalReturn : datepickerPopup= ' + configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup);     	
				      }	

				    
				      
				      //unique key (set only first time) in this model is formly control type + Date.now(); 
				        var newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

				        if (validKeyUniqueness(newKey, configurationObj) === true){
				          //console.info('1st attempt : new Key is unique');
				          configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
				        }else{
				          //console.warn('1st attempt : new Key is not unique');
				          //2nd attempt
				          newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

				          if (validKeyUniqueness(newKey, configurationObj) === true){
				            //console.info('2nd attempt : new Key is unique');
				            configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
				          }else{
				            //console.warn('2nd attempt : new Key is not unique');
				            //2nd attempt
				            newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
				          }
				        }                                                                     

				      configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;

				      
				  },


				  applyConfigToSelectedControl: function(nyaSelectObj){
				  	//used in modal (edit control)
				    for (var i = nyaSelectObj.controls.length - 1; i >= 0; i--) {
				      if (nyaSelectObj.controls[i].id === nyaSelectObj.selectedControl) {

				          nyaSelectObj.controls[i].formlyLabel = nyaSelectObj.temporyConfig.formlyLabel;
				          nyaSelectObj.controls[i].formlyRequired = nyaSelectObj.temporyConfig.formlyRequired;
				          nyaSelectObj.controls[i].formlyDesciption = nyaSelectObj.temporyConfig.formlyDesciption;
				          nyaSelectObj.controls[i].formlyPlaceholder = nyaSelectObj.temporyConfig.formlyPlaceholder;
				          nyaSelectObj.controls[i].formlyOptions = nyaSelectObj.temporyConfig.formlyOptions;

				          if (nyaSelectObj.controls[i].id ==='Date' ) {
				          	nyaSelectObj.controls[i].datepickerPopup = nyaSelectObj.temporyConfig.datepickerPopup;

				          	//console.warn('applyConfigToSelectedControl : datepickerPopup= ' + nyaSelectObj.controls[i].datepickerPopup);     	
				          }
				        
				       }
				    }
				  }




    		};

	/////////////////////////////////////////
	// functions
	/////////////////////////////////////////    		

  //init object : return true (if not true, you may have problem^^)
  function resetNyaSelect(nyaSelectObj){
    var newNyaSelectObj = {

                    controls : [
                                {id: 'empty',  name: 'no control', subtitle: 'no control', group: 'Blank', formlyType: 'blank', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [] , formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {} },
                                {id: 'Header',  name: 'Header', subtitle: 'no control', group: 'Decoration', formlyType: 'header', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [] , formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
                                {id: 'Subtitle',  name: 'Subtitle', subtitle: 'no control', group: 'Decoration', formlyType: 'subTitle', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [] , formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
                                {id: 'TextInput',  name: 'Text input', subtitle: 'Text input', group: 'input', formlyType: 'input', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [] , formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
                                {id: 'Password',  name: 'Password', subtitle: 'Password', group: 'input', formlyType: 'input', formlySubtype: 'password', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [] , formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
                                {id: 'Date',  name: 'Date', subtitle: 'Date', group: 'input', formlyType: 'datepicker', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [], datepickerPopup: 'dd-MMMM-yyyy', formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
                                {id: 'Texarea', name: 'Textarea', subtitle: 'Textarea', group: 'Textarea', formlyType: 'textarea', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [], formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
                                {id: 'RichTextEditor', name: 'RichTextEditor', subtitle: 'RichTextEditor', group: 'Textarea', formlyType: 'richEditor', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [], formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
                                {id: 'Radio', name: 'Radio', subtitle: 'Radio', options: [], group: 'Radio', formlyType: 'radio', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '' , formlyOptions: [], formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
                                {id: 'Checkbox', name: 'Checkbox', subtitle: 'Checkbox', group: 'Checkbox', formlyType: 'checkbox', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [], formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
                                {id: 'BasicSelect', name: 'Basic select', subtitle: 'Basic select',options: [], group: 'Select', formlyType: 'basicSelect', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '', formlyOptions: [], formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}},
                                {id: 'GroupedSelect', name: 'Grouped Select', subtitle: 'Grouped Select',options: [], group: 'Select', formlyType: 'groupedSelect', formlySubtype: '', formlyLabel: '', formlyRequired: false, formlyDesciption: '',formlyOptions: [], formlyExpressionProperties: {}, formlyValidators: {}, formlyValidation: {}}
                              ],

                      selectedControl : 'none' ,
                      temporyConfig : {
                                        selectedControl: 'none',
                                        formlyLabel: 'label', 
                                        formlyRequired: false, 
                                        formlyDesciption: '',
                                        formlyPlaceholder: '',
                                        formlyOptions : []
                                      } 

    };

    //reset
  	angular.copy(newNyaSelectObj, nyaSelectObj);
    return true;
  }




  
  function returnControlFromAddCtrlModalModel(CtrlModalModel){

    var modelToReturn = {
          selectedControl:'none',
          formlyType : 'none',
          formlySubtype: 'none',
          formlyLabel: '',
          formlyRequired : false,
          formlyDesciption: '',
          formlyPlaceholder: '',
          formlyOptions: []
    };

    for (var i = CtrlModalModel.controls.length - 1; i >= 0; i--) {
      if (CtrlModalModel.selectedControl === CtrlModalModel.controls[i].id) {
        modelToReturn.selectedControl = CtrlModalModel.selectedControl;
        modelToReturn.formlyType = CtrlModalModel.controls[i].formlyType;
        modelToReturn.formlySubtype = CtrlModalModel.controls[i].formlySubtype;
        modelToReturn.formlyLabel = CtrlModalModel.controls[i].formlyLabel;
        modelToReturn.formlyRequired = CtrlModalModel.controls[i].formlyRequired;
        modelToReturn.formlyDesciption = CtrlModalModel.controls[i].formlyDesciption;
        modelToReturn.formlyPlaceholder = CtrlModalModel.controls[i].formlyPlaceholder;
        modelToReturn.formlyOptions = CtrlModalModel.controls[i].formlyOptions;

        //particular properties 
        //datetpicker format
        if (CtrlModalModel.controls[i].formlyType === 'datepicker') {
			modelToReturn.datepickerPopup = CtrlModalModel.controls[i].datepickerPopup;   
			//console.warn('returnControlFromAddCtrlModalModel : datepickerPopup= ' + modelToReturn.datepickerPopup);     	
        }
      }
    }
    return modelToReturn;
  }

  
  function validKeyUniqueness(thisKey, configurationObj){
    var isUnique = true;
    //each lines
    for (var i = configurationObj.lines.length - 1; i >= 0; i--) {
      //each columns
      for (var j = configurationObj.lines[i].columns.length - 1; j >= 0; j--) {
        if (configurationObj.lines[i].columns[j].control.key === thisKey) {
          isUnique = false;
        }
          
      }
      
    }

    return isUnique;  
  }  

  }]);

