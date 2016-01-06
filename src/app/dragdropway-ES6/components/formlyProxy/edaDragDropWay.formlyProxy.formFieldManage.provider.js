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
  this.getEasyFormListControls                                = getEasyFormListControls;
  this.addEasyFormControlToList                               = addEasyFormControlToList;
  this.getHeaderTemplates                                     = getHeaderTemplates;
  this.addHeaderTemplateCssClass                              = addHeaderTemplateCssClass;
  this.getFormlyControlTemplate                               = getFormlyControlTemplate;
  this.addformlyControlTemplatesCssClass                      = addformlyControlTemplatesCssClass;
  this.setFormlyControlTemplate                               = setFormlyControlTemplate;
  
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

  function getEasyFormListControls() {
    return _easyFormListControls;
  }
 
  function addEasyFormControlToList(controlDeclaration) {
    if (typeof controlDeclaration !== 'undefined'){
      _easyFormListControls.controls.push(controlDeclaration);
    }
  }
  
  function getHeaderTemplates() {
    return _headerTemplates;
  }
  
  function addHeaderTemplateCssClass(cssClassToAdd){
    if (typeof cssClassToAdd !== 'undefined') {
      _headerTemplates.cssClass.push(cssClassToAdd);
    }
  }
  
  function getFormlyControlTemplate() {
    return _formlyControlTemplates;
  }
  
  function addformlyControlTemplatesCssClass(cssClassToAdd){
    if (typeof cssClassToAdd !== 'undefined') {
      _formlyControlTemplates.className.push(cssClassToAdd);
    }
  }  
  
  function setFormlyControlTemplate(newFormlyControlTemplate) {
    if (('className'				in newFormlyControlTemplate) &&
        ('type' 						in newFormlyControlTemplate) &&
        ('key' 							in newFormlyControlTemplate) &&
        ('templateOptions') in newFormlyControlTemplate) {
      _formlyControlTemplates = angular.copy(newFormlyControlTemplate);
    }
    return true;
  }  
  
  
  
}


EasyFormGenFormlyBindingModels.$inject = [];

export default EasyFormGenFormlyBindingModels;

export {
  EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER
};