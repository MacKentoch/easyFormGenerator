import * as helpers from './edaDragDropWay.formlyProxy.formFieldManage.provider.helpers';

const EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER = 'EasyFormGenFormlyBindingModels';

function EasyFormGenFormlyBindingModels(){

  let _easyFormListControls                                   =	helpers.initEasyFormListControls();
  let _easyFormEmptyConfigurationLineModel                    = helpers.initEasyFormEmptyConfigurationLineModel();
  let _emptyControlFieldModel                                 = helpers.initEmptyControlFieldModel();
  let _easyFormInitialStateConfigurationModel                 = helpers.initEasyFormInitialStateConfigurationModel(_easyFormEmptyConfigurationLineModel);
  let _easyFormInitialStateConfigurationModelAddOnForStepWay  = helpers.initEasyFormInitialStateConfigurationModelAddOnForStepWay();
  let _easyFormReloadConfigurationModel                       = helpers.initEasyFormReloadConfigurationModel();
  let _headerTemplates                                        = helpers.initHeaderTemplates(); 
  let _formlyControlTemplates                                 = helpers.initFormlyControlTemplates();  
  let _particularControlProperties                            = helpers.initParticularControlProperties();  
  
  this.getAllParticularControlProperties                      = getAllParticularControlProperties;
  this.addParticularControlProperties                         = addParticularControlProperties;
  
  function getAllParticularControlProperties(){
    return _particularControlProperties;
  }    
    
  function addParticularControlProperties(newParticularControlProperty){
    // test object param has waited properties
    if (('controlType' 	in newParticularControlProperty) &&
        ('properties' 	in newParticularControlProperty)) {
      let isAnUpdate = false;
      if ( _particularControlProperties.length > 0 ) {
        _particularControlProperties.forEach(function(controlProp){
          if (controlProp.controlType === newParticularControlProperty.controlType) {
            controlProp.properties = [].concat(newParticularControlProperty.properties);
            isAnUpdate = true;
          }	
        });
      }
      if (!isAnUpdate) {
        _particularControlProperties.push(newParticularControlProperty);
      }
    }
    return _particularControlProperties;			
  }  


 


}


EasyFormGenFormlyBindingModels.$inject = [];

export default EasyFormGenFormlyBindingModels;

export {
  EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER
};