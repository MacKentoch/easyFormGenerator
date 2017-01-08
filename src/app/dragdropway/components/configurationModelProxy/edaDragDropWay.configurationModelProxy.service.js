const DRAG_DROP_CONFIG_PROXY_SERVICE = 'ddModelConfModelProxyService';

class ddModelConfModelProxyService{
  
  constructor(
    EasyFormGenFormlyBindingModels,  
    // controllerModalProxy, 
    // dragDropConfig, 
    easyFormDragWayConfig,
    $parse){
    this.EasyFormGenFormlyBindingModels = EasyFormGenFormlyBindingModels;
    // this.controllerModalProxy           = controllerModalProxy;
    // this.dragDropConfig                 = dragDropConfig;
    this.easyFormDragWayConfig          = easyFormDragWayConfig;
    this.$parse                         = $parse;
    this.init();  
  }
  
  init(){
    
  }

  refreshAllConfigurationFromDragAndDropModel(configModel, ddModel){
    /**
     * TODO : prevent reset already set props
     * 
     * previousConfigurationModel = a backup of configuration model 'configModel 'before resetting it
     * -> dragDrop model contains unique keys of already existing controls : these controls must not be reset / overwritten  
     */
    // let previousConfigurationModel = angular.copy(configModel); 
    configModel.lines = [];
    // iterates line config model
    angular.forEach(ddModel[1], (lineValue, keyValue)=>{
      // add empty line 1st - if line is empty -> it will be enough 
      configModel.lines.push(angular.copy(this.EasyFormGenFormlyBindingModels.getEasyFormEmptyConfigurationLineModel()));
      // update line value field
      this.applyThisLine(keyValue + 1, keyValue, configModel);
      // iterate through columns and add them if control exists	
      angular.forEach(lineValue, (colValue, colIndex)=>{
        // push an empty control model but relative to dradrop : model control type - (if datepicker so additionnal properties are added) 	
        let controlToBind = {
          control : angular.copy(this.EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(lineValue.length, this.getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]).formlyType))
        };
        let formlyDetailedControlModel = this.getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]);
        // controls alreadys existed so do not reset it - control to bind is the previous one		
        if(typeof colValue.key !== 'undefined'){
          //console.warn('debug dragdropModel show this control key : ' + colValue.key);
          controlToBind.control = angular.copy(colValue.configModelControl);
          //update cssClass depending new position:
          var newClassName = this.EasyFormGenFormlyBindingModels.getFormlyControlTemplateForNcolumnLine(lineValue.length, this.getFormlyDetailedControlModelFromDragDropObject(lineValue[colIndex]).formlyType);
          controlToBind.control.className = newClassName.className;
          //test if header nee this one
          controlToBind.control.cssClass = newClassName.className;
          // get control details for this key in backup : previousConfigurationModel
          }else{
            // controls did not exists before : control to bind is a new one
            // bind dragdrop control properties to configuration model through controlToBind var
            this.bindConfigCtrlModelFromFormlyDetailedCtrlModel(formlyDetailedControlModel, controlToBind, configModel);
          }	
          // apply controlToBind var to configuration model control
          if (typeof configModel.lines[keyValue].columns[colIndex] === 'undefined') configModel.lines[keyValue].columns.push(angular.copy(this.EasyFormGenFormlyBindingModels.getEasyFormConfigurationEmptyControlModel())); 
          configModel.lines[keyValue].columns[colIndex].control 	= angular.copy(controlToBind.control);
          configModel.lines[keyValue].columns[colIndex].numColumn = colIndex + 1;
          configModel.lines[keyValue].columns[colIndex].exist 		= true;
      });
    });
    return configModel;
  } 
  
   
  refreshControlsKeys(configModel, dragDropModel){				
    angular.forEach(configModel.lines, (aConfigLine, aConfigLineIndex)=>{						
        angular.forEach(aConfigLine.columns, (aConfigControl, aConfigControlIndex)=>{
          //if last control removed from line - and dragDrop model did not already removed this line
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
  }


  /**
   * drag drop model
   * -> will be used to bind configuration model
   * 	of no key saved, configuration model controls would be reset each drop events
   * 
   * -> matching key : will prevent to reset existing control
   */
  loadDragDropModelFromConfigurationModel(configModel, dragDropModel){				
    //reset dragdrop fields model NOT all dragDropModel!
    dragDropModel[1] = [];
    angular.forEach(configModel.lines, (aConfigLine, aConfigLineIndex)=>{
      //add new line
      dragDropModel[1].push([]);
      angular.forEach(aConfigLine.columns, (aConfigControl)=>{
        // get control type from configuration.control.selectedControl
        let dragdropControlRef = {
          control   : 'empty',
          cssClass  : 'col-xs-12',
          label     : '<div class="col-md-12"> <div class="form-group"> <div class=""> </div> </div></div>'
        };
        angular.forEach(dragDropModel[0], (groupOfCtrlRef)=>{
          angular.forEach(groupOfCtrlRef, (aCtrlref)=>{
            if (aCtrlref.control === aConfigControl.control.selectedControl) dragdropControlRef = angular.copy(aCtrlref);
          });
        });
        dragDropModel[1][aConfigLineIndex].push(dragdropControlRef);
        //update class depending number of control per line
        let cssClassToApply = this.easyFormDragWayConfig.getItemCssDependingNumberItemsInRow(dragDropModel[1][aConfigLineIndex].length);
        angular.forEach(dragDropModel[1][aConfigLineIndex], (ddControlToUpdate)=>ddControlToUpdate.cssClass = cssClassToApply);
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
  }




  /**
   * returns a control model that is more formly detailed
   * (more formly detailed : see controls property in EasyFormGenFormlyBindingModels._easyFormListControls)
   */
  getFormlyDetailedControlModelFromDragDropObject(dragDrapCtrlModel){
    let controlModel        = {};
    let listControl         = this.EasyFormGenFormlyBindingModels.getEasyFormListControls();
    let controlsListGetter  = this.$parse('controls');
    
    angular.forEach(controlsListGetter(listControl), (ctrlListValue)=>{
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
 validKeyUniqueness(thisKey, configurationObj){
    let isUnique = true;
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
  
  
  createUniqueKey(baseKeyValue, configurationObj){
    // unique key (set only first time) in this model is formly control type + Date.now(); 
    let newKey = baseKeyValue + '-' + Date.now();
    if (this.validKeyUniqueness(newKey, configurationObj) === true){
      return newKey;
    }else{
      newKey = baseKeyValue + '-' + Date.now();
      if (this.validKeyUniqueness(newKey, configurationObj) === true){
        return newKey;
      }else{
        newKey = baseKeyValue + '-' + Date.now();
        return newKey;
      }
    } 
  }  
 

  applyThisLine(linevalue, lineIndex, configModel){
    angular.forEach(configModel.lines, (aLineValue, aLineKey)=>{
      if (aLineKey === lineIndex) aLineValue.line = linevalue;
    });
  }  
  

  /**
   * bind formly detailed model to configuration control model
   */
  bindConfigCtrlModelFromFormlyDetailedCtrlModel(formlyDetailCtrlModel, configurationCtrlModel, configModel){
    /**
      * TODO :properties should be served by provider 
      * more configurable without pain
      */
    //set selected control :
    this.$parse('control.selectedControl').assign(configurationCtrlModel, this.$parse('selectedControl')(formlyDetailCtrlModel));
    //set type :	
    this.$parse('control.type').assign(configurationCtrlModel, this.$parse('formlyType')(formlyDetailCtrlModel));
    //set key :	
    this.$parse('control.key').assign(configurationCtrlModel, this.createUniqueKey(this.$parse('control.type')(configurationCtrlModel), configModel));
    //set subtype :	
    this.$parse('control.subtype').assign(configurationCtrlModel, this.$parse('formlySubtype')(formlyDetailCtrlModel));
    //set templateOptions.label :	
    this.$parse('control.templateOptions.label').assign(configurationCtrlModel, this.$parse('formlyLabel')(formlyDetailCtrlModel));					
    //set templateOptions.required :	
    this.$parse('control.templateOptions.required').assign(configurationCtrlModel, this.$parse('formlyRequired')(formlyDetailCtrlModel));	
    //set templateOptions.required :	
    this.$parse('control.templateOptions.description').assign(configurationCtrlModel, this.$parse('formlyDescription')(formlyDetailCtrlModel));	
    //set templateOptions.required :	
    this.$parse('control.templateOptions.placeholder').assign(configurationCtrlModel, this.$parse('formlyPlaceholder')(formlyDetailCtrlModel));
    //set templateOptions.required :	
    this.$parse('control.templateOptions.options').assign(configurationCtrlModel, this.$parse('formlyOptions')(formlyDetailCtrlModel));

    if (this.$parse('control.type')(configurationCtrlModel) === 'datepicker') {
      this.$parse('control.templateOptions.datepickerPopup').assign(configurationCtrlModel, this.$parse('datepickerPopup')(formlyDetailCtrlModel));
    }    
  }  
  
  
}

ddModelConfModelProxyService.$inject = [
  'EasyFormGenFormlyBindingModels',
  // 'controllerModalProxy',
  // 'dragDropConfig',
  'easyFormDragWayConfig',
  '$parse'  
];

export default ddModelConfModelProxyService;
export {
  DRAG_DROP_CONFIG_PROXY_SERVICE
};
