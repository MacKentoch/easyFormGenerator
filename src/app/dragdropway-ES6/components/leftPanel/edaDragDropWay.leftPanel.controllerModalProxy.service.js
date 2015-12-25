/* global angular */

/**
 * TODO : 
 * - clean deprecated functions
 */

const CONTROLLER_MODAL_PROXY = 'controllerModalProxy';

class controllerModalProxy{
  
  constructor(EasyFormGenFormlyBindingModels){
    this.EasyFormGenFormlyBindingModels = EasyFormGenFormlyBindingModels;
    this.init();
  }
  
  init(){
    this.ProxyModel = {};
    this.resetProxyModel();
  }
  
 
  // deprecated in drag and drop version, use initProxyModel insead 
  initNyaSelect(nyaSelectObj){
    return this.resetNyaSelect(nyaSelectObj);
  }  
  
  
  /**
   * return nyaSelectModel from Selected control in configuration model
   * 
   * note : deprecated in drag and drop version since no modal involved so just set private nyasSelect object.
   * 				-> in drag and drop version : use 'setProxyModelFromConfigurationSelection' instead 
   * 					to set private object that will be readable to side edit panel
   */  
  getNyASelectFromSelectedLineColumn(nyaSelectObj, configurationObj, indexLine, numcolumn){
    this.resetNyaSelect(nyaSelectObj);  
    // data send to modal controller
    if (typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions != 'undefined') {
      nyaSelectObj.temporyConfig.selectedControl 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl : 'none';
      nyaSelectObj.temporyConfig.formlyLabel 				= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
      nyaSelectObj.temporyConfig.formlyRequired	 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
      nyaSelectObj.temporyConfig.formlyDesciption 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
      nyaSelectObj.temporyConfig.formlyPlaceholder 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
      nyaSelectObj.temporyConfig.formlyOptions 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';
      // particular case : datepicker
      if (nyaSelectObj.temporyConfig.selectedControl === 'Date') {
        nyaSelectObj.temporyConfig.datepickerPopup = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';
      }
    }
    return nyaSelectObj;
  }  
  

  /**
   * deprecated in drag and drop version : 
   * 	use bindConfigurationModelFromProxyModel to refresh configuration after control update in side panel
   * 
   * will be used in closePanel
   */
  bindConfigurationModelFromModalReturn(indexLine, numcolumn, modalAddCtrlModel, configurationObj){
            
    let extractedProps = this.returnControlFromAddCtrlModalModel(modalAddCtrlModel);

    configurationObj.lines[indexLine].columns[numcolumn].control.selectedControl 	= extractedProps.selectedControl;
    configurationObj.lines[indexLine].columns[numcolumn].control.type 						= extractedProps.formlyType;
    configurationObj.lines[indexLine].columns[numcolumn].control.subtype 					= extractedProps.formlySubtype;
    // templateOptions
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions = {
      label				: '',
      required		: false,
      description	: '',
      placeholder	: '',
      options			: []
    };
    // then bind template option
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label 				= extractedProps.formlyLabel;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required 		= extractedProps.formlyRequired;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description 	= extractedProps.formlyDesciption;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder 	= extractedProps.formlyPlaceholder;
    configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options 			= extractedProps.formlyOptions;

    /**
     * add additionnal — particular — properties :
     * -> datepicker : datepickerPopup
     */
    if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup = extractedProps.datepickerPopup;
    }	

    /**
     * unique key (set only first time) in this model is formly control type + Date.now(); 
     */
    var newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

    if (this.validKeyUniqueness(newKey, configurationObj) === true){
      configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
    }else{
      newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
      if (this.validKeyUniqueness(newKey, configurationObj) === true){
        configurationObj.lines[indexLine].columns[numcolumn].control.key = newKey;
      }else{
        newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();
      }
    }                                                                     
    configurationObj.lines[indexLine].columns[numcolumn].control.edited = true;
  }  
  
 
  applyConfigToSelectedControl(nyaSelectObj){
    for (let i = nyaSelectObj.controls.length - 1; i >= 0; i--) {
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
  } 
  
  
  
  // deprecated : in drag and drop version, use "resetProxyModel()""
  resetNyaSelect(nyaSelectObj){
    let newNyaSelectObj = this.EasyFormGenFormlyBindingModels.getEasyFormListControls();
    angular.copy(newNyaSelectObj, nyaSelectObj);
    return true;
  }
  
  
  resetProxyModel(){
    let newProxyModel = this.EasyFormGenFormlyBindingModels.getEasyFormListControls();
    this.proxyModel = angular.copy(newProxyModel);
    return true;
  }  
 
  returnControlFromAddCtrlModalModel(CtrlModalModel){
    let modelToReturn = {
          selectedControl		: 'none',
          formlyType 				: 'none',
          formlySubtype			: 'none',
          formlyLabel				: '',
          formlyRequired 		: false,
          formlyDesciption	: '',
          formlyPlaceholder	: '',
          formlyOptions			: []
    };

    for (let i = CtrlModalModel.controls.length - 1; i >= 0; i--) {
      if (CtrlModalModel.selectedControl === CtrlModalModel.controls[i].id) {

        modelToReturn.selectedControl 	= CtrlModalModel.selectedControl;
        modelToReturn.formlyType 				= CtrlModalModel.controls[i].formlyType;
        modelToReturn.formlySubtype 		= CtrlModalModel.controls[i].formlySubtype;
        modelToReturn.formlyLabel 			= CtrlModalModel.controls[i].formlyLabel;
        modelToReturn.formlyRequired 		= CtrlModalModel.controls[i].formlyRequired;
        modelToReturn.formlyDesciption 	= CtrlModalModel.controls[i].formlyDesciption;
        modelToReturn.formlyPlaceholder = CtrlModalModel.controls[i].formlyPlaceholder;
        modelToReturn.formlyOptions 		= CtrlModalModel.controls[i].formlyOptions;
        // particular properties, here ; datetpicker format 
        if (CtrlModalModel.controls[i].formlyType === 'datepicker') modelToReturn.datepickerPopup = CtrlModalModel.controls[i].datepickerPopup;   
      }
    }
    return modelToReturn;
  }  
  

    validKeyUniqueness(thisKey, configurationObj){
	    let isUnique = true;
	    for (let i = configurationObj.lines.length - 1; i >= 0; i--) {
	      for (let j = configurationObj.lines[i].columns.length - 1; j >= 0; j--) {
	        if (configurationObj.lines[i].columns[j].control.key === thisKey) {
	          isUnique = false;
	        }
	      } 
	    }
	    return isUnique;  
	  }


    getSelectedProxyModel(configurationSelectedCtrl){
	  	var selectedProxyModelControl = 'none';
	  	var listProxyModelCTRL        = angular.copy(this.EasyFormGenFormlyBindingModels.getEasyFormListControls().controls);

	  	listProxyModelCTRL.forEach(function(control){
	  		if (control.formlyType 		=== configurationSelectedCtrl.type &&
	  				control.formlySubtype === configurationSelectedCtrl.subtype) {
          selectedProxyModelControl = control.id;
          return selectedProxyModelControl;
	  		}
	  	});
	  	return selectedProxyModelControl;
	  }
  
  
  
  
}

controllerModalProxy.$inject = [
  'controllerModalProxy'
];

export default controllerModalProxy;

export {
  CONTROLLER_MODAL_PROXY
};