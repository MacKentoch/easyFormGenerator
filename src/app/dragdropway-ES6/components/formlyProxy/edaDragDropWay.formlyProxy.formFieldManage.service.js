const FORM_FIELD_MANAGE_SERVICE = 'formFieldManage';

class formFieldManage{
  
  constructor(EasyFormGenFormlyBindingModels){
    this.EasyFormGenFormlyBindingModels = EasyFormGenFormlyBindingModels;
    this.init();
  }
  
  init(){
    
  }
  
  /**
   * At initial state : configuration model will contain 1 line, since :
   *    -> it is non sense to create a form without a single line (no line = no form at all)
   *    -> so it is non sense to force user to add a first line
   * 
   *  PLEASE NOTE columns array contains objects that look like formly fields one
   */
  initConfigurationEditFromScratch(configurationModel, addStepWayProperties){
    let configurationModelInit = this.initConfigurationEditFromScratchEasyFormGenFormlyBindingModels.getEasyFormInitialStateConfigurationModel(addStepWayProperties); 
    angular.copy(configurationModelInit, configurationModel);
  }  
  
  /**
   * Get an configuration empty (no init line) then empty it with lines array provided in param
   * @param   object - configurationModel   [configuration model]
   * @param   array -  lines                [an array : lines to apply to an empty configuration model]
   * @param   bool -   addStepWayProperties [description]
   * @return {object message}               [give details on how it happened to caller]
   */
  bindConfigurationLines(configurationModel, lines, addStepWayProperties){
    if( Object.prototype.toString.call(lines) === '[object Array]' ) {
      let configurationModelResult = this.EasyFormGenFormlyBindingModels.getEasyFormReloadConfigurationModel(addStepWayProperties);
      configurationModelResult.lines = [].concat(lines);  
      angular.copy(configurationModelResult, configurationModel);                                         
      return this.getMessageObject('configuration model is bound','lines are bound to configuration model.');
    }else{
      return this.getErrorObject('lines is not an array', 'Checks lines type, it is not an array.');
    }
  }
 
 
  /**
   * applyConfigurationToformlyModel : 
   *  - bind configuration model into formly field model
   *  - reset dataModel (formlyfield may have changed so previous dataModel would be false)
   * @param  configurationModel 
   * @param  formlyModel        
   * @param  formlyDataModel    
   */
  applyConfigurationToformlyModel(configurationModel, formlyModel, formlyDataModel){
    this.resetFormlyModel(formlyModel);
    this.resetDataModel(formlyDataModel);
    let lineNumber = configurationModel.lines.length;
    for (let i = 0; i < lineNumber; i++) {
      this.AddNColumnControl(formlyModel, configurationModel, i); 
    }
  }  
   

  resetFormlyModel(formlyModel){
    let resetformly = [];
    angular.copy(resetformly, formlyModel);
  } 
    
  
}

formFieldManage.$inject = [
  'EasyFormGenFormlyBindingModels'
];

export default formFieldManage;

export {
  FORM_FIELD_MANAGE_SERVICE
};