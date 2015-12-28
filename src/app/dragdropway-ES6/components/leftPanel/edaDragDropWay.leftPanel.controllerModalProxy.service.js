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
    this.ProxyModel     = {};
    this.resetProxyModel();
    this.editPanelModel = {
      toggle      : false,
      lineIndex   : -1,
      columnIndex : -1,
      control     : {}
    };
  }
  
 
  // deprecated in drag and drop version, use initProxyModel insead 
  initNyaSelect(nyaSelectObj){
    return this.resetNyaSelect(nyaSelectObj);
  }  
  
  
  initProxyModel(thisProxyModelToInit){
    return this.resetProxyModel(thisProxyModelToInit);
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
    
    
  // to refresh configuration model from edit panel
  bindConfigurationModelFromProxyModel(indexLine, numcolumn, configurationObj){          
    let extractedProps = angular.copy(this.proxyModel.temporyConfig);
    
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
    // add additionnal — particular — properties : -> datepicker : datepickerPopup
    if (configurationObj.lines[indexLine].columns[numcolumn].control.type === 'datepicker') {
      configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup = extractedProps.datepickerPopup;
    }	
    // unique key (set only first time) in this model is formly control type + Date.now(); 
    let newKey = configurationObj.lines[indexLine].columns[numcolumn].control.type + '-' + Date.now();

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


  /**
   * set local proxyModel from Selected control in configuration model
   * 
   * replace deprecated "getNyASelectFromSelectedLineColumn"
   * -model is now named "proxyModel"
   * -model is stored in this service 
   * 
   * -> it has just more sence!
   */
  setProxyModelFromConfigurationSelection(configurationObj, indexLine, numcolumn){
    // data send to modal controller
    if (typeof configurationObj.lines[indexLine].columns[numcolumn].control != 'undefined') {
      // determine selected control from indexes and control.type and control.subtype in configuration model 
      this.proxyModel.selectedControl 									= typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? this.getSelectedProxyModel(configurationObj.lines[indexLine].columns[numcolumn].control) : 'none';
      this.proxyModel.temporyConfig.selectedControl 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? this.getSelectedProxyModel(configurationObj.lines[indexLine].columns[numcolumn].control) : 'none';
      this.proxyModel.temporyConfig.formlyType 				  = typeof configurationObj.lines[indexLine].columns[numcolumn].control.type != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.type: 'none';
      this.proxyModel.temporyConfig.formlySubtype 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.subtype != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.subtype : 'none';
      this.proxyModel.temporyConfig.formlyLabel 				= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.label : '';
      this.proxyModel.temporyConfig.formlyRequired	 		= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.required : '';
      this.proxyModel.temporyConfig.formlyDesciption 	  = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.description : '';
      this.proxyModel.temporyConfig.formlyPlaceholder 	= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.placeholder : '';
      this.proxyModel.temporyConfig.formlyOptions 			= typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.options : '';
      // particular case : datepicker
      if (this.proxyModel.temporyConfig.selectedControl === 'Date') {
        this.proxyModel.temporyConfig.datepickerPopup = typeof configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup != 'undefined' ? configurationObj.lines[indexLine].columns[numcolumn].control.templateOptions.datepickerPopup : '';
      }
    }
    return this.proxyModel;
  }
  
  
	getProxyModel(){
    return this.proxyModel;
  }  
  
  
  /**
   * ============================================================
   * following methods for "editPanelModel"
   * 
   * Note this model : 
   * - to manage side edit control panel
   * ============================================================
   */  

  // getter : editPanelModel (whole model => type = object)			 
  getEditPanelModelAllModel(){
    return this.editPanelModel;
  }  
  
  // setter : editPanelModel (whole model => type = object)
  setEditPanelModelControl(newEditPanelModel){
    let successfullDone  = false;
    if (typeof newEditPanelModel !== 'undefined') {
      this.editPanelModel = angular.copy(newEditPanelModel);
      successfullDone     = true;	
    }
    return successfullDone;
  }  
  
  
  // getter : editPanelModel.columnIndex
  getEditPanelModelColumnIndex(){
	 return this.editPanelModel.columnIndex;
  }
  
  
  // setter : editPanelModel.columnIndex
  setEditPanelModelColumnIndex(newColumnIndex){
    let successfullDone  = false;
    if (typeof newColumnIndex !== 'undefined') {
      this.editPanelModel.columnIndex = newColumnIndex;
      successfullDone                 = true;	
    }
    return successfullDone;
  }  
  
  
  // getter : editPanelModel.lineIndex
  getEditPanelModelLineIndex(){
    return this.editPanelModel.lineIndex;
  } 
  
  
  // setter : editPanelModel.lineIndex
  setEditPanelModelLineIndex(newLineIndex){
    let successfullDone  = false;
    if (typeof newLineIndex !== 'undefined') {
      this.editPanelModel.lineIndex = newLineIndex;
      successfullDone = true;	
    }  
    return successfullDone;
  }  
  
  // getter : editPanelModel.control  
  getEditPanelModelControl(){
    return this.editPanelModel.control;
  }
  
  // getter : editPanelModel.toggle
  getEditPanelModelToggle(){
    return this.editPanelModel.toggle;
  }  
  
  // setter : editPanelModel.toggle 
  setEditPanelModelToggle(newToggleValue){
    let successfullDone  = false;
    if (typeof newToggleValue !== 'undefined') {
      this.editPanelModel.toggle  = newToggleValue;
      successfullDone             = true;	
    }
    return successfullDone;
  }  
  
  
}

controllerModalProxy.$inject = [
  'controllerModalProxy'
];

export default controllerModalProxy;

export {
  CONTROLLER_MODAL_PROXY
};