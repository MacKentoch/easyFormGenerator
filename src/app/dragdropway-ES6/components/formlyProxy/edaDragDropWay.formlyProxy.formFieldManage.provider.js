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
  this.$get                                                   = getFct;
  
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
  
  getFct.$inject = [];
  function getFct(){
    let service = {
      getEasyFormListControls                   : getEasyFormListControlsFct,
      getEasyFormInitialStateConfigurationModel : getEasyFormInitialStateConfigurationModel,
      getEasyFormReloadConfigurationModel       : getEasyFormReloadConfigurationModel,
      getEasyFormEmptyConfigurationLineModel    : getEasyFormEmptyConfigurationLineModel,
      getEasyFormConfigurationEmptyControlModel : getEasyFormConfigurationEmptyControlModel,
      getRawHeaderTemplates                     : getRawHeaderTemplates,
      getHeaderTemplateForNcolumnLine           : getHeaderTemplateForNcolumnLine,
      getRawFormlyControlTemplates              : getRawFormlyControlTemplates,
      getFormlyControlTemplateForNcolumnLine    : getFormlyControlTemplateForNcolumnLine
    };
    return service;
    
    function getEasyFormListControlsFct() {
      return _easyFormListControls;
    }
    
    function getEasyFormInitialStateConfigurationModel(addStepWayProperties) {
      let initialConfigurationModel = angular.copy(_easyFormInitialStateConfigurationModel);
      if (typeof addStepWayProperties !== 'undefined') {
        if (addStepWayProperties) {
           // add properties specific to step way
          angular.extend(initialConfigurationModel, _easyFormInitialStateConfigurationModelAddOnForStepWay);
        }
      }
      return initialConfigurationModel;      
    }
    
    function getEasyFormReloadConfigurationModel(addStepWayProperties) {
      let initialConfigurationModel = angular.copy(_easyFormReloadConfigurationModel);
      if (typeof addStepWayProperties !== 'undefined') {
        if (addStepWayProperties) {
          // add properties specific to step way
          angular.extend(initialConfigurationModel, _easyFormInitialStateConfigurationModelAddOnForStepWay);
        }
      }
      return initialConfigurationModel;      
    }
    
    function getEasyFormEmptyConfigurationLineModel() {
      return _easyFormEmptyConfigurationLineModel;      
    }
    
    function getEasyFormConfigurationEmptyControlModel() {
      return _emptyControlFieldModel;      
    }
    
    function getRawHeaderTemplates() {
      return _headerTemplates;
    }
    
    function getHeaderTemplateForNcolumnLine(nbColInLines, textContent) {
      if (typeof nbColInLines !== 'undefined' &&
          typeof textContent 	!== 'undefined') {
        if (nbColInLines === parseInt(nbColInLines, 10)) {
          if (nbColInLines <=  _headerTemplates.cssClass.length) {
            let headerToReturn        = {};
            headerToReturn.className  = _headerTemplates.cssClass[nbColInLines - 1];
            // header html property depends this property dont forget to set it before reading html property
            _headerTemplates.textContent = textContent;
            _headerTemplates.selectedClass = headerToReturn.className;
            headerToReturn.template = [
              _headerTemplates.simpleHtml1,
              textContent,
              _headerTemplates.simpleHtml2
            ].join('');
            return headerToReturn;
          }
        }
      }      
    }
    
    function getRawFormlyControlTemplates() {
      return _formlyControlTemplates;
    } 
    
    
    function getFormlyControlTemplateForNcolumnLine(nbColInLines, controlType) {
        if (typeof nbColInLines !== 'undefined') {
          if (nbColInLines === parseInt(nbColInLines, 10)) {
            if (nbColInLines <=  _formlyControlTemplates.className.length) {
              let controlToReturn       = angular.copy(_formlyControlTemplates);
              controlToReturn.className = _formlyControlTemplates.className[nbColInLines - 1];
              // throw `it should have a bug upper line`;
              /* eslint no-console:0 */
              console.warn(`it should have a bug upper line`);
              /**
               * check controlType: it may require another particular property
               */
              if (typeof controlType !== 'undefined') {
                _particularControlProperties.forEach((controlProp)=>{
                  if (controlProp.controlType === controlType) {
                    /**
                     * add all properties this controlType has
                     * 
                     * NOTE : dot expression and bracket expression to access object property
                     * http://www.ecma-international.org/ecma-262/5.1/#sec-11.2.1
                     */										
                    controlProp.properties.forEach((aPropToAdd)=>{
                      if (aPropToAdd.isRoot) controlToReturn[aPropToAdd.value] = '';
                      if (aPropToAdd.isTemplateOptions) controlToReturn.templateOptions[aPropToAdd.value] = '';
                    });
                  }	
                });
              }
              return controlToReturn;
            }
          }
        }
      }       
    
    
  }
  
  
}


EasyFormGenFormlyBindingModels.$inject = [];

export default EasyFormGenFormlyBindingModels;

export {
  EASY_FORM_FORMLY_BINDING_MODEL_PROVIDER
};